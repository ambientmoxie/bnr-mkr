<script>
  const buildDateStr = import.meta.env.VITE_BUILD_DATE;
  const buildDate = new Date(buildDateStr);

  function getFullMonth(i) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[i];
  }

  function setUpdate() {
    const current = {
      month: getFullMonth(buildDate.getMonth()),
      day: (buildDate.getDate() < 10 ? "0" : "") + buildDate.getDate(),
      year: buildDate.getFullYear(),
      hour: (buildDate.getHours() < 10 ? "0" : "") + buildDate.getHours(),
      minute: (buildDate.getMinutes() < 10 ? "0" : "") + buildDate.getMinutes(),
    };

    const outputDate =
      current.month +
      " " +
      current.day +
      ", " +
      current.year +
      " at " +
      current.hour +
      ":" +
      current.minute;

    return outputDate;
  }

</script>

<p>
  Last updated on
  <span id="update-time">{setUpdate()}</span>
</p>
