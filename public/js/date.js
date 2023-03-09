flatpickr("#date", {
    inline: true,
    static: true,
    onChange: function(selectedDates, dateStr, instance) {
        document.querySelector("input[name='date']").value = dateStr;
    },
});