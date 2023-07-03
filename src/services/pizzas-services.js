import config from "../../dbconfig.js";
import sql from 'mssql';
class PizzaService {
    
    getAll = async () => {
        let returnArray = null;
        console.log('Estoy en: PizzaService.getPizza()');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request().query("SELECT * FROM Pizzas");
            returnArray = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en PizzaService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Pizzas WHERE id=@pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    
    insert = async (pizza) => {
        let rowsAffected = 0;
        console.log('Estoy en: PizzaService.insert(pizza)', pizza);

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                .query(`INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    update = async (pizza) => {
        let rowsAffected = 0;
        console.log('Estoy en: PizzaService.insert(pizza)', pizza);

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                .input('pId'         , sql.Int   , pizza?.Id ?? 0)
                .query(`UPDATE Pizzas SET Nombre = @pNombre, LibreGluten=@pLibreGluten, Importe=@pImporte, Descripcion=@pDescripcion WHERE Id=@pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: PizzaService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE From Pizzas WHERE id =@pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default PizzaService;