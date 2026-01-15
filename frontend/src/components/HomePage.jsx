import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div>
            <h1>健康診断アプリ</h1>
            <div>
                <ul>
                    <li><Link to="/calc">BMI計算</Link></li>
                    <li><Link to="/statistic">統計（複数人での診断）</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default HomePage
