import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, TableFooter, Collapse, IconButton, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useReports } from "./useReports";
import { HeartbeatType } from "services/heartbeat.service";
import { Status } from "../Sectors/Sector/useSensor";


const ServiceMeasure = {
    [HeartbeatType.Water]: 'lts',
    [HeartbeatType.Electricity]: 'kW/h',
    [HeartbeatType.Naturalgas]: 'm3'
};


const CollapsibleRow = ({ mainRow, breakdownRows }) => {
    const [open, setOpen] = useState(false);
    const { sectorMap, locationMap } = useReports();
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
          {locationMap[mainRow.location].name}
        </TableCell>
        <TableCell>{Math.round(mainRow.consumption)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, marginLeft: 15 }}>
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
                        { sectorMap[breakdownRow.sector].name }
                      </TableCell>
                      <TableCell>{Math.round(breakdownRow.consumption)}</TableCell>
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
    const reportsStore = useReports();
    useEffect(() => {
        reportsStore.fetch();
    }, [reportsStore.fetch]);
    
    if (reportsStore.status === Status.LOADING) {
        return <LinearProgress />;
    }
    return (
        <Stack direction="column" spacing={5}>
            {
                Object.entries(reportsStore.breakdown).map(([type, breakdownType]) => (
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
                        </Table>
                    </TableContainer>
                </div>
        ))
            }
        </Stack>
    );
}

export default Reports;