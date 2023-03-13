flatpickr("#date", {
  inline: true,
  static: true,
  onChange: async function (selectedDates, dateStr, instance) {
    const tbodyId = document.getElementById("tbody-id");
    tbodyId.innerHTML = `<tbody>
    <tr>
      <td colspan="3" class="text-center">
        <img src="/admin/loader/loader.svg" alt="" />
      </td>
    </tr>
  </tbody>`;
    const bodyData = {
      date: dateStr,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    };
    try {
      let html = ``;
      const fetchResponse = await fetch(`${location}/getbydate`, settings);
      const data = await fetchResponse.json();
      if (data) {
        data.data.forEach((d) => {
          html += `
            <tr>
                <td>${d.name}</td>
                <td class="stat-cell">${d.reason}</td>
                <td class="stat-cell">${d.created_at}</td>
            </tr>
            `;
        });
        tbodyId.innerHTML = html;
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  },
});
