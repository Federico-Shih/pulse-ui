import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, TableFooter, Collapse, IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const ServiceTypes = {
    WATER: "water",
    ELECTRICITY: "energy",
    NATURALGAS: "gas",
};

const ServiceMeasure = {
    [ServiceTypes.WATER]: 'lts',
    [ServiceTypes.ELECTRICITY]: 'kW/h',
    [ServiceTypes.NATURALGAS]: 'm3'
};

const breakdown = {
    [ServiceTypes.WATER]: {
        location1: {
            sector1: 100,
            sector2: 200,
            sector3: 500,
            sector4: 200,
        },
        location2: {
            sector3: 500,
            sector4: 200,
        }
    },
    [ServiceTypes.ELECTRICITY]: {
        location1: {
            sector1: 100,
            sector2: 200,
            sector3: 500,
            sector4: 200,
        },
        location2: {
            sector3: 500,
            sector4: 200,
        }
    },
    [ServiceTypes.NATURALGAS]: {
        location1: {
            sector1: 100,
            sector2: 200,
            sector3: 500,
            sector4: 200,
        },
        location2: {
            sector3: 500,
            sector4: 200,
        }
    }
}

const CollapsibleRow = ({ mainRow, breakdownRows }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {mainRow.location}
        </TableCell>
        <TableCell>{mainRow.consumption}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sector</TableCell>
                    <TableCell>Consumption</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {breakdownRows.map((breakdownRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        { breakdownRow.sector }
                      </TableCell>
                      <TableCell>{breakdownRow.consumption}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
    );
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

                                    </TableCell>
                                    <TableCell>
                                        Location
                                    </TableCell>
                                    <TableCell>
                                        Consumption({ServiceMeasure[type]})
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.entries(breakdownType).map(([locationName, value]) => (
                                        <CollapsibleRow
                                            mainRow={{ location: locationName, consumption: Object.values(value).reduce((a, b) => a+b)}}
                                            breakdownRows={Object.entries(value).map(([sector, value]) => ({ sector, consumption: value }))}
                                        />
                                    ))
                                }
                            </TableBody>
                            {/* <TableFooter>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        total
                                    </TableCell>
                                    <TableCell>
                                        {Object.values(breakdownType).map(Object.values).map(Object.values).reduce((prev, current) => prev + current, 0)}
                                    </TableCell>
                                </TableRow>
                            </TableFooter> */}
                        </Table>
                    </TableContainer>
                </div>
        ))
            }
        </Stack>
    );
}

export default Reports;