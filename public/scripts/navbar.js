const isOnline = async () => {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        const url = "/api/auth/online";
        let response = await fetch(url, opts);
        response = await response.json();
        const selector = document.querySelector("#opts");
        if (response.online) {
            console.log(response);            
            selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/profile/${response.user_id}">Profile</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/cart/${response.user_id}">Cart</a>
            <button class="btn btn-succes py-1 px-2 m-1" id="signout">Logout</button>
            `;
            document.querySelector("#signout").addEventListener("click", async() => {
                try {
                    const opts = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    };
                    const url = "api/auth/signout";
                    await fetch(url, opts);
                    window.location.href = "/";
                } catch (error) {
                    console.error(error);
                }
            })
        } else {
            selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
            `;
        }
    } catch (error) {
        console.error(error);
    }
}

isOnline();