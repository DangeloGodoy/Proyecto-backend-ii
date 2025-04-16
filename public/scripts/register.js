document.querySelector("#register").addEventListener("click", async () => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const firtsName = document.querySelector("#firtsName").value;
    const lastName = document.querySelector("#lastName").value;
    const age = document.querySelector("#age").value;

    if (!firtsName || !lastName || !email || !password) {
      swal(
        "Datos faltantes!",
        "Los campos de First Name, Last Name, Email y Password son obligatorios",
        "warning"
      );
      return;
    }
    if (emailRegex.test(email) === false) {
      swal(
        "Email invalido!",
        "El email ingresado no es valido",
        "warning"
      );
      return;
    }
    const data = { email, password, firtsName, lastName, age };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "/api/auth/register";

    let response = await fetch(url, opts);
    response = await response.json();
    if (response.error) {
      swal(
        "Error al registrar!",
        response.error,
        "error"
      );
    } else {
      swal(
        "Usuario registrado!",
        "El usuario ha sido registrado con exito",
        "success"
      );
      location.replace("/login");
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    swal(
      "Error inesperado!",
      "Ocurrio un error inesperado, por favor intente nuevamente",
      "error"
    );
  }
});
