import React from 'react';
import { Chart } from "react-google-charts";
class home extends React.Component {  
    render () {

        return (
            <div className="welcome-div">
                <header>
                    <h1>About UNVotes</h1>
                </header>
                <p>
                    Browse UN General Assembly resolutions online. View resolutions by country and year!
                </p>
                <p>
                    This is made by Khalil Samoud and Chase Duvall. Website not officially affiliated with the United Nations.
                </p>
                <p> 
                This website features 6203 resolutions and 202 countries (including former sovereign states, such as the German Democratic Republic, Czechoslovakia, Zanzibar, and Serbia and Montenegro). 
                </p>
                <p>  The resolutions in our dataset have been classified by Harvard researchers into six main areas: </p>
               <Chart
                width={'500px'}
                height={'300px'}
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
              <p>For more details on our data, please visit <a href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=hdl:1902.1/12379">https://dataverse.harvard.edu/dataset.xhtml?persistentId=hdl:1902.1/12379</a>.</p>
            </div>)
}}
export default home;
