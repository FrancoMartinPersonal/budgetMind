### documentation of routes ###

``
"/u/users".get =>> obtiene todos los usuarios
"/u/user/:id".get =>> obtiene los datos de un usuario en específico en base a su id
"/u/register".post =>> envía el registro de un usuario, la contraseña la encripta, si no recibe info suficiente tira error, si es suficiente pero el mail o el usuario 
existen, también tira error
"/u/login".post =>> se requiere o bien el mail, o bien un usuario, si se consiguen, se desencripta y se compara la contraseña, el comparador devuelve un booleano, si true pasa, si no, no pasa .
también ofrece un token para poder viajar por las diferentes páginas
"/u/validate".get =>> se utiliza para poder acceder a la página con el poder de cliente



``