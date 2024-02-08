let heading = document.createElement("h1");
heading.setAttribute("id", "title");
heading.setAttribute("class", "text-center");
heading.innerText = "COUNTRY DETAILS WITH WEATHER USING API";
document.body.append(heading);

let container = document.createElement("div");
container.setAttribute("class", "container");
document.body.append(container);

let align = document.createElement("div");
align.setAttribute("class", "row");
container.append(align);

try {
  const details = fetch("https://restcountries.com/v3.1/all");
  details
    .then((res) => res.json())
    .then((data) => {
      for (let i in data) {
        let [lat, long] = data[i].latlng;

        let resDiv = document.createElement("div");
        resDiv.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
        align.append(resDiv);
        //////////////////---------card-------/////////////////////////
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        resDiv.append(card);
        //////////////----------- Country Name ----------///////////////
        let cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        cardHeader.innerText = data[i].name.common;
        card.append(cardHeader);
        ////////////////----flag--------///////////////////////////////
        let flag = document.createElement("img");
        flag.setAttribute("class", "card-img-top");
        flag.setAttribute("src", data[i].flags.png);
        card.append(flag);
        ///////////////----card body-----//////////////////////////////
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        card.append(cardBody);
        ////////////-----card body content-----/////////////////////////
        let cardDetails = document.createElement("div");
        cardDetails.setAttribute("class", "card-text");
        cardDetails.innerHTML = ` <div> Capital : ${data[i].capital}  </div>
            <div> Region : ${data[i].region}  </div>
            <div> Latitude : ${lat}  </div>
            <div> Longitude : ${long}  </div>
            <div> Country code : ${data[i].cca3}  </div>`;
        cardBody.append(cardDetails);
        //////////////-------weather------------------///////////////////
        let climate = document.createElement("div");
        cardBody.append(climate);
        /////////////-------------- button-------------///////////////////
        let btnDiv = document.createElement("div");
        cardBody.append(btnDiv);
        ////////////////////////////////////////////////////////////
        let button = document.createElement("button");
        button.innerText = " Click for weather";
        button.setAttribute("class", "btn btn-primary");
        btnDiv.append(button);

        button.addEventListener("click", () => {
          if (flag.className == "card-img-top") {
            const weather =
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[i].latlng[0]}&lon=${data[i].latlng[1]}&appid=0d58cb20712c490a2eea573e606c9039
&units=metric`);

            weather
              .then((res) => res.json())
              .then((wdata) => {
                climate.className = "card-text text-center mt-3 ";
                flag.className = "display";
                // climate.className = "modal-dialog modal-dialog-centered";
                climate.innerHTML = `
              <div style = "color : red; "> Weather Information :</div>
               <div> Temperature: ${wdata.main?.temp}&#176;C  </div>
            <div> Humidity: ${wdata.main.humidity} g/kg  </div>
            <div> Pressure : ${wdata.main.pressure} Nm²</div>
            <div> Condition : ${wdata?.weather[0]?.description}  </div>
            <div> Wind Speed : ${wdata.wind.speed} km </div
            `;
              });
            // flag.innerHTML = "";
            button.innerHTML = "click here to close ";
            button.className = "btn btn-danger ";
          } else {
            // cardDetails.className = "card-text";
            flag.className = "card-img-top";
            climate.className = "display";
            button.innerHTML = "Click for weather";
            button.className = "btn btn-primary ";
          }
        });
      }
    });
} catch (err) {
  console.log(err);
}

// `https://api.openweathermap.org/data/2.5/weather?q=${data[i].capital}&appid=0d58cb20712c490a2eea573e606c9039
// &units=metric`;
