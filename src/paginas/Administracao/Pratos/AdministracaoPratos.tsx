import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import htpp from "../../../http";
import IPrato from "../../../interfaces/IPrato";


const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        htpp.get<IPrato[]>('pratos/')
            .then(resultado => {
                setPratos(resultado.data)
                console.log(pratos)
            }).catch(resultado => {
                console.log(resultado)
            })
    }, [])

    const excluir = (PratosAhSerExcluido: IPrato) => {
        htpp.delete(`pratos/${PratosAhSerExcluido.id}/`).then(() => {
            alert("O Pratos foi exluido");
            const listaPratos = pratos.filter(pratos => pratos.id !== PratosAhSerExcluido.id)
            setPratos([...listaPratos])
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
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(item =>
                        <TableRow key={item.id}>
                            <TableCell >
                                {item.nome}
                            </TableCell>
                            <TableCell >
                                {item.descricao}
                            </TableCell>
                            <TableCell >
                                {item.tag}
                            </TableCell>
                            <TableCell >
                                <a href={item.imagem} target="_blank" rel="noreferrFer">Ver Imagem</a>
                            </TableCell>
                            <TableCell >
                                [<RouterLink to={`/admin/pratos/${item.id}`}>
                                    Editar
                                </RouterLink>]
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

export default AdministracaoPratos;