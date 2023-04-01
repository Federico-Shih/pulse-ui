import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, TableFooter } from "@mui/material";
import { Container } from "@mui/system";

const ServiceTypes = {
    WATER: "water",
    ENERGY: "energy",
    GAS: "gas",
};

const ServiceMeasure = {
    [ServiceTypes.WATER]: 'lts',
    [ServiceTypes.ENERGY]: 'kW/h',
    [ServiceTypes.GAS]: 'm3'
};

const breakdown = {
    water: {
        sector1: 100,
        sector2: 200,
        sector3: 500,
        sector4: 200,
    },
    gas: {
        sector1: 200,
        sector2: 3000,
        sector4: 250,
    },
    energy: {
        sector1: 210,
        sector2: 600,
    }
}

const Reports = () => {
    return (
        <Stack direction="column" spacing={5}>
            {
                Object.entries(breakdown).map(([type, breakdownType]) => (
                <div>
                    <Typography variant="h3" sx={{ textTransform: "capitalize", paddingBottom: 5 }}>
                        {type}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Service
                                    </TableCell>
                                    <TableCell>
                                        Consumption({ServiceMeasure[type]})
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.entries(breakdownType).map(([sectorName, value]) => (
                                        <TableRow>
                                            <TableCell component={"th"}>
                                                {sectorName}
                                            </TableCell>
                                            <TableCell>
                                                {value}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>
                                        total
                                    </TableCell>
                                    <TableCell>
                                        {Object.values(breakdownType).reduce((prev, current) => prev + current)}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
        ))
            }
        </Stack>
    );
}

export default Reports;