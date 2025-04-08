document.querySelector("#register").addEventListener("click", async () => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            name: document.querySelector("#name").value,
            date: document.querySelector("#date").value,
            avatar: document.querySelector("#avatar").value,
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
        const url = "/api/auth/register";
        let response = await fetch(url, opts);
        response = await response.json();
        console.log(response)
        if (response.error) {
            alert(response.error);
        } else {
            location.replace("/login");
        }
    } catch (error) {
        console.log(error);
        //modificar a tostyfiay
        alert("Error al registrar el usuario");
    }
})