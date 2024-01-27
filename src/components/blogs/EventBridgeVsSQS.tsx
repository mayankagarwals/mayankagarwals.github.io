import backgroundImage from "../../assets/website_background.jpg";
import '../../App.css';

export default function EventBridgeVsSQS(){

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (

        <div style={backgroundStyle}>
            <div className="overlay">
                <h1 style={{fontSize: "120px", marginTop: "-300px", marginBottom: "90px"}}>Blogs</h1>
                <ol className="blogList" style={{fontSize: "25px"}}>
                    <li><div style={{marginBottom: "50px"}}>The Pitfalls of Using Redis Locks with Spring Transactions</div></li>
                    <li><div>When to choose between EventBridge and SQS</div></li>
                </ol>
            </div>
        </div>

    )
}