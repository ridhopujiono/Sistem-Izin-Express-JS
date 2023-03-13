
async function auth(){
    let username = document.querySelector("input[name='username'");
    let password = document.querySelector("input[name='password'");

    document.querySelector('.btn-login').innerHTML = `...`;
    
    if(username.value == "" || password.value == ""){
        iziToast.error({
            title: 'Username or password is required',
            position: 'bottomLeft'
        });
        document.querySelector('.btn-login').innerHTML = `Log In`;
    }else{
        const bodyData = {
            username: username.value,
            password: password.value
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
            const fetchResponse = await fetch(`http://${location}:3000/auth`, settings);
            const data = await fetchResponse.json();
            if(data){
                username.value = ``;
                password.value = ``;
                document.querySelector('.btn-login').innerHTML = `Log In`;
                if(data.status == 200){
                    iziToast.success({
                        title: 'Logged Successfully',
                        position: 'bottomLeft'
                    });
                    document.cookie = `_token=${data.token}`;
                }else{
                    iziToast.error({
                        title: 'Error Logging In',
                        position: 'bottomLeft'
                    });
                }
            }else{
                iziToast.error({
                    title: 'Username or password incorrect',
                    position: 'bottomLeft'
                });
            }
        } catch (e) {
            return e;
        }
    }
}