import { useState } from 'react'

function StatisticPage() {
    const [sendData, setSendData] = useState([]);
    const [formData, setFormdata] = useState({ Name: "", Height: "", Weight: "" });
    const [result, setResult] = useState({});

    const addSendData = (e) => {
        e.preventDefault();
        if (sendData.some(item => item.Name === formData.Name)) {
            alert("同じ名前が既に追加されています");
            return;
        } else if (formData.Name === "" || formData.Height === "" || formData.Weight === "") {
            alert("すべての項目を入力してください");
            return;
        }

        const data = {...formData, Height: parseFloat(formData.Height), Weight: parseFloat(formData.Weight)};
        setSendData([...sendData, data]);
        resetFormData();
    }

    const postData = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5229/statistic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendData)
        });

        setResult(await response.json());
    }

    const resetFormData = () => {
        setFormdata({ Name: "", Height: "", Weight: "" });
    }

    return (
        <div>
            <h1>複数人の身長・体重から統計をとります</h1>
            <form action="">
                <label htmlFor="name">名前</label>
                <input
                    type="text" minLength={1} maxLength={20}
                    value={formData.Name}
                    onChange={(e) => setFormdata({...formData, Name: e.target.value})}
                />
                <label htmlFor="height">身長</label>
                <input
                    type="number" min={1} maxLength={3}
                    value={formData.Height}
                    onChange={(e) => setFormdata({...formData, Height: e.target.value})}
                />
                <label htmlFor="weight">体重</label>
                <input
                    type="number" min={1} maxLength={3}
                    value={formData.Weight}
                    onChange={(e) => setFormdata({...formData, Weight: e.target.value})}
                />
                <button type="submit" onClick={(e) => addSendData(e)}>追加</button>
            </form>
            <dl>
                {sendData.length > 0 &&
                    sendData.map((data, index) => {
                        return (<div key={index} style={{ display: "flex" }}>
                            <dt>名前: {data.Name}</dt>
                            <dd>身長: {data.Height}cm, 体重: {data.Weight}kg</dd>
                        </div>)
                    })
                }
                {sendData.length === 0 && <p>まだデータが追加されていません</p>}
            </dl>

            <button type="submit" onClick={(e) => postData(e).then(console.log(result))}>送信</button>

            <div>
                <h2>結果</h2>
                <dl>
                    {result.average != undefined &&
                        <>
                            <dt>人数: </dt>
                            <dd>{result.memberCount}人</dd>
                            <dt>平均BMI: </dt>
                            <dd>{Math.round(result.average * 100) / 100}kg/m²</dd>
                            <dt>健康な人数: </dt>
                            <dd>{result.healthMemberCount}人</dd>
                        </>
                    }
                    {result.average === undefined && <p>結果無し</p>}
                </dl>
            </div>
        </div>
    )
}

export default StatisticPage
