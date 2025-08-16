 const clock = document.getElementById('clock');
    const timezoneSelect = document.getElementById('timezone');
    const toggleFormatBtn = document.getElementById('toggleFormat');

    let is24Hour = true; // default 24-hour format

    // Load all timezones
    function getAllTimezones() {
      try {
        return Intl.supportedValuesOf('timeZone');
      } catch (e) {
        return [
          "UTC","Asia/Dhaka","Europe/Lisbon","Europe/Paris","Europe/Zagreb",
          "America/New_York","Asia/Dubai","Asia/Tokyo","Australia/Sydney"
        ];
      }
    }



    function populateTimezones() {
      const timezones = getAllTimezones();
      
      console.log(timezones,'this is all the timezones')

      timezones.forEach((tz) => {

        const option = document.createElement('option');

        option.value = tz

        option.textContent = tz

        timezoneSelect.appendChild(option);

      });

      timezoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone
      
    }

    function updateClock() {

      const timezone = timezoneSelect.value;

      const now = new Date();

      const options = {

        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour

      };

      const timeString = new Intl.DateTimeFormat('en-US', options).format(now)

      clock.textContent = timeString;
    }

    // Toggle between 12h / 24h



    toggleFormatBtn.addEventListener('click', () => {
        
      is24Hour = !is24Hour;

      toggleFormatBtn.textContent = is24Hour ? "24-Hour" : "12-Hour (AM/PM)";

      updateClock();
    });




    // Initialize

    populateTimezones();

    updateClock();

    setInterval(updateClock, 1000);

    timezoneSelect.addEventListener('change', updateClock);