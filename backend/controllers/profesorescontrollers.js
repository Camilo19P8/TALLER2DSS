const db = require("../database/conexion.js");

class ProfesoresController {
  construct() {}

  consultar(req, res) {
    try {
      //const {dni,nombre,apellido,email,profesor,telefono} = req.body;
      db.query("SELECT  * FROM profesores", [], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  actualizar(req, res) {
    const { id } = req.params;
    try {
      const { dni, nombre, apellidos, email, profesor, telefono } = req.body;
      db.query(
        "UPDATE profesores SET dni=?, nombre=?, apellidos=?, email=?, profesor=?, telefono=? WHERE id=?;",
        [dni, nombre, apellidos, email, profesor, telefono, id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          }
          if (rows.affectedRows == 1)
            res
              .status(200)
              .json({ respuesta: "Registro actualizado correctamente" });
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  ingresar(req, res) {
    try {
      const myJSON = JSON.stringify(req.body);
      console.log("la información que llega es " + myJSON);
      //console.log ("......lo que llega al ingresar " + req.body.dni);
      const { dni, nombre, apellidos, email, profesor, telefono } = req.body;

      db.query(
        "INSERT INTO profesores (id, dni, nombre, apellidos, email,profesor,telefono) VALUES (NULL, ?, ?, ?, ?,?,?);",
        [dni, nombre, apellidos, email, profesor, telefono],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else {
            res.status(201).json({ id: rows.insertId });
          }
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  consultarDetalle(req, res) {
    const { id } = req.params;
    /*res.json ({msg:'Consulta detalle estudiantes desde clase y id de  '+id}); */
    try {
      const { dni, nombre, apellido, email, profesor, telefono } = req.body;
      db.query("SELECT  * FROM profesores WHERE id=?", [id], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
        }
        res.status(200).json(rows[0]);
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  borrar(req, res) {
    //res.json ({msg:"Borrar estudiantes desde clase"});
    const { id } = req.params;
    try {
      db.query(
        "DELETE FROM cursos.profesores WHERE id=?;",
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          }
          if (rows.affectedRows == 1)
            res
              .status(200)
              .json({ respuesta: "Registro borrado correctamente" });
        }
      );
    } catch (err) {
      //console.log(err);
      res.status(500).send(err.message);
    }
  }
}

module.exports = new ProfesoresController();
