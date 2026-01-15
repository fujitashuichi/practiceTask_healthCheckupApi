var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors();


app.MapPost("/calc", (BmiData data) =>
{
    return new {
        bmi = data.CalculateBmi(),
        status = data.GetStatus(),
    };
});

app.MapPost("/statistic", (List<BmiData> dataList) =>
{
    var healthCheckRequest = new HealthCheckRequest { bmiDataList = dataList };
    return healthCheckRequest.GetStatistics();
});

app.Run();


public class BmiData
{
    public string Name { get; set; } = "";
    public double Height { get; set; }
    public double Weight { get; set; }

    public double CalculateBmi()
    {
        if (Height <= 0)
        {
            return 0;
        }
        double HeightInM = Height / 100;
        return Weight / (HeightInM * HeightInM);
    }

    public string GetStatus()
    {
        if (CalculateBmi() <= 0)
        {
            return "不正な入力";
        }
        if (CalculateBmi() < 18.5)
        {
            return "痩せ型";
        }
        else if (CalculateBmi() < 25)
        {
            return "標準";
        }
        else
        {
            return "肥満";
        }
    }
}

public class HealthCheckRequest
{
    public List<BmiData> bmiDataList { get; set; } = [];

    public object GetStatistics()
    {
        if (bmiDataList.Count == 0) return new { Average = 0 };

        double AverBmi = bmiDataList.Average(d => d.CalculateBmi());

        int healthyMemberCount = 0;
        foreach (var data in bmiDataList)
        {
            if (data.GetStatus() == "標準")
            {
                healthyMemberCount++;
            }
        }

        return new
        {
            Average = AverBmi,
            MemberCount = bmiDataList.Count,
            HealthyMemberCount = healthyMemberCount
        };
    }
}
