import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resultado => {
                setRestaurantes(resultado.data)
                console.log(restaurantes)
            }).catch(resultado => {
                console.log(resultado)
            })
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`).then(() => {
            alert("O restaurante foi exluido");
           const listaRestaurante = restaurantes.filter(restaurantes => restaurantes.id !== restauranteAhSerExcluido.id)
           setRestaurantes([...listaRestaurante])
        })
    }

    return (
        <TableContainer component={(Paper)}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {restaurantes.map(item =>
                        <TableRow key={item.id}>
                            <TableCell >
                                {item.nome}
                            </TableCell>
                            <TableCell >
                                [<Link to={`/admin/restaurantes/${item.id}`}>
                                    Editar
                                </Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(item)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;