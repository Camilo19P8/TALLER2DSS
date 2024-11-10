from flask import Flask, request, render_template, redirect, url_for, session
import mysql.connector
import vonage
import random
import subprocess
from database import get_user_by_username  # Importar la función para obtener el usuario de la base de datos

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necesario para almacenar datos en la sesión

# Configuración de Vonage API
client = vonage.Client(key="09113bb5", secret="qVgpne2WqauRflQi")
sms = vonage.Sms(client)

# Conexión a la base de datos
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Kurumy2004",
        database="cursos"
    )
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-sms', methods=['POST'])
def send_sms():
    username = request.form['username']
    user = get_user_by_username(username)
    
    if user:
        numero = user[2]  # Recuperamos el campo 'numero' de la tabla 'usuario'
        print(f"El número de teléfono recuperado es: {numero}")

        codigo_aleatorio = random.randint(1000, 9999)
        session['codigo_correcto'] = str(codigo_aleatorio)
        session['user_id'] = user[0]
        session['nombre_usuario'] = user[1]
        session['rol'] = user[3]  # Recuperamos el campo 'tipo_usuario' de la tabla 'usuario'

        responseData = sms.send_message(
            {
                "from": "VonageAPI",
                "to": numero,
                "text": f"Tu código es: {codigo_aleatorio}"
            }
        )
        print(f"Respuesta de Vonage: {responseData}")
        return redirect(url_for('verify_code'))
    else:
        return "Usuario no encontrado. Por favor verifica tu nombre de usuario."

@app.route('/verify')
def verify_code():
    return render_template('verify.html')

@app.route('/verify-code', methods=['POST'])
def verify_code_input():
    codigo_ingresado = request.form['code']
    codigo_correcto = session.get('codigo_correcto')
    user_id = session.get('user_id')
    nombre_usuario = session.get('nombre_usuario')
    rol = session.get('rol')

    if codigo_ingresado == codigo_correcto:
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Eliminar todas las sesiones previas
            cursor.execute("DELETE FROM Sesion")
            conn.commit()

            # Guardar nueva sesión
            cursor.execute("INSERT INTO Sesion (Id_Usuario, Nombre_Usuario, Rol) VALUES (%s, %s, %s)", (user_id, nombre_usuario, rol))
            conn.commit()

            cursor.close()
            conn.close()

            # Ejecutar el comando
            comando = "cd C:\\Users\\calar\\Escritorio\\Semana5DesarrolloSoftwareSeguro\\taller2; netlify dev"
            subprocess.run(["powershell", "-Command", comando], shell=True)
            
            return redirect(url_for('comando_ejecutado'))
        except Exception as e:
            return f"Error al ejecutar el comando: {e}"
    else:
        return "Código incorrecto. Intenta nuevamente."

@app.route('/comando-ejecutado')
def comando_ejecutado():
    return """
        <script>
            alert('Comando ejecutado correctamente.');
            window.close();
        </script>
    """

if __name__ == '__main__':
    app.run(debug=True)
