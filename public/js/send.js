async function sendPermit(){

    document.getElementById("btn-main").innerHTML = `...`;
    const date_el = document.getElementById('date');
    const userId_el = document.querySelector('select[name="userId"]');
    const reason_el = document.getElementById('reason');
    const bodyData = {
        date: date_el.value,
        userId: userId_el.value,
        reason: reason_el.value
    }
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    };
    const location = window.location.hostname;
    try {
        const fetchResponse = await fetch(`http://${location}:3000/permit`, settings);
        const data = await fetchResponse.json();
        if(data){
            date_el.value = ``;
            userId_el.value = ``;
            reason_el.value = ``;
            document.getElementById("btn-main").innerHTML = `Kirim Izin!`;
            iziToast.success({
                title: 'Selamat',
                message: 'Izin berhasil terkirim!',
                position: 'bottomRight'
            });
        }
    } catch (e) {
        return e;
    }  
}