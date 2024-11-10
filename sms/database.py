import mysql.connector
from mysql.connector import Error

# Función para conectarse a la base de datos y verificar el usuario
def get_user_by_username(username):
    try:
        # Configuración de conexión a la base de datos MySQL
        conn = mysql.connector.connect(
            host="localhost",         # Cambia esto si usas un host diferente
            user="root",              # Reemplaza con tu usuario de MySQL
            password="Kurumy2004",    # Reemplaza con tu contraseña de MySQL
            database="cursos"         # Nombre de la base de datos (puede ser distinto, verifica en tu configuración)
        )

        # Usar 'with' para asegurar que el cursor se cierre automáticamente
        with conn.cursor() as cursor:
            # Consulta SQL para obtener el usuario con el nombre de usuario especificado
            cursor.execute("SELECT id, username, numero, tipo_usuario FROM usuarios WHERE username = %s", (username,))
            user = cursor.fetchone()  # Obtener el resultado de la consulta
        
        return user  # Retorna None si no se encuentra el usuario, o la tupla con los datos del usuario si existe

    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None  # En caso de error, retornamos None

    finally:
        if conn.is_connected():
            conn.close()  # Cerramos la conexión a la base de datos
