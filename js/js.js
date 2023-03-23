window.addEventListener("load", () => {
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    const api =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/belgrade?unitGroup=metric&key=2D2GPPG2MAUV995ES9J7HLHPE&contentType=json";

    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { temp, conditions, icon } = data.currentConditions;
        temperatureDegree.textContent = temp;
        temperatureDescription.textContent = conditions;

        locationTimezone.textContent = data.resolvedAddress;
        setIcons(icon, document.querySelector(".location-icon"));
      });
  } else {
    alert("Please tap Allow to let the app use your Location");
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
