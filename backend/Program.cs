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

    public void GetStatistics()
    {
        double bmiSum = 0;
        foreach (var data in bmiDataList)
        {
            bmiSum += data.CalculateBmi();
        }
        double AverBmi = bmiSum / bmiDataList.Length();

        return new
        {
            AverageBmi = AverBmi,
        };
    }
}
