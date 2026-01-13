import { useState } from 'react'


function App() {
  const [formData, setFormData] = useState({ name: "", height: "", weight: "" });
  const [result, setResult] = useState({ bmi: "", status: "" });

  const handlePost = async () => {
    const sendData = {
      Name: formData.name,
      Height: parseFloat(formData.height),
      Weight: parseFloat(formData.weight),
    }

    const response = await fetch("http://localhost:5094/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    setResult(await response.json());
  }

  return (
    <>
      <div className='formWrapper'>
        <form action="" method="post">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label htmlFor="height">Height [cm]</label>
          <input
            type="number"
            id="height"
            min={1}
            maxLength={3}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          />

          <label htmlFor="weight">Weight [kg]</label>
          <input
            type="number"
            id="weight"
            min={1}
            maxLength={3}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          />

          <input type="button" value="計算" onClick={handlePost} />
        </form>

        <table>
          <tbody>
            <tr>
              <td>BMI</td>
              <td>{result.bmi || "none"}</td>
            </tr>
            <tr>
              <td>肥満度</td>
              <td>{result.status || "none"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
