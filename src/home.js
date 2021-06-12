import React from 'react';
import { Chart } from "react-google-charts";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class home extends React.Component {  
    render () {

        return (
            <div>
    <section class = "hero" className = "hero">
        <div class="video-wrapper">
            <div class="wrapper">
                <iframe title="Video_Website Video 2021_Web_16x9_Draft 1" src="https://player.vimeo.com/video/516845835?dnt=1&amp;app_id=122963&amp;controls=0&amp;hd=1&amp;autohide=1&amp;background=1&amp;autoplay=1" width="100%" height="900" border-left-width= "900"  allow="autoplay; fullscreen; picture-in-picture" allowFullScreen={false}>
                </iframe>
            </div>
            
        </div>
        <div className="overlay"></div>
        <h1 id="text"> United Nations Resolutions </h1>
        <p id ="smallt"> Browse UN General Assembly resolutions online. View resolutions by country and year! </p>
        <img id = "imglogo" src = "https://www.pngkey.com/png/full/139-1391666_un-logo-white-united-nations-logo-white.png" />
    </section>
        <div className="grid-container">
            <div className="grid-item"> 
                <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Issues', 'Percentage of total resolutions'],
                  ['ME: Votes relating to the Palestinian conflict', 19],
                  ['NU: Votes relating to nuclear weapons and nuclear material', 13],
                  ['DI: Votes relating to arms control and disarmament', 16],
                  ['CO: Votes relating to colonialism', 18],
                  ['HR: Votes relating to human rights', 17],
                  ['Votes relating to (economic) development', 9],
                ]}
                options={{
                  title: 'United Nations Resolutions',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
            <div className="grid-item-blue"> 
            <p id="text-white"> This website features 6203 resolutions From 1946 to 2019.</p>
            <p id="text-smaller"> There are six main resolution categories: the Palestinian conflict, nuclear weapons, arms control, colonialism, human rights, and economic development.</p>
            <p id="text-smaller"> The resolutions page in this website allows you to choose a specific resolution from a chosen year. To access the page please click on the button below</p>
             <Link to="/resolutions">
     <button  className="myButton"type="button">
          See Resolutions
     </button>
 </Link>
            </div>
            <div className="grid-item-blue"> 
            <p id="text-white"> This website features 202 countries.</p>
            <p id="text-smaller">  The website includes 202 countries including former sovereign states, such as the German Democratic Republic, Czechoslovakia, Zanzibar, and Serbia and Montenegro. </p>
            <p id="text-smaller">To access the countries page click on the button below. Once you choose a country you have to select a year from the dropdown menu. </p>
            <Link to="/countries">
     <button  className="myButton"type="button">
          See Countries
     </button>
            </Link>
            </div>
            <div className="grid-item"> 
            <div className = "white"> 
            <p id="big-text"> More Details </p>
            <p id="detail-text">This website is made by Khalil Samoud and Chase Duvall as a project for <a href="https://cs396-web-dev.github.io/spring2021/"> CS-396 Web Development </a> .</p>
            <p id="detail-text"> This Website is not officially affiliated with the United Nations.For more details on our data, please visit <a href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=hdl:1902.1/12379"> Harvard's dataverse.</a> </p>
            <p id="detail-text"> For the countries' details in the countries page we used the <a href="http://restcountries.eu/"> Rest Countries API.</a> For the Maps in the resolutions page we used the <a href="https://developers.google.com/chart/interactive/docs/gallery/geochart"> Google Chart API.</a> </p>
             </div>
            </div>
        </div>
            </div>)
}}
export default home;
