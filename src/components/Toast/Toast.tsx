import Box from "@mui/material/Box";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast} from 'react-toastify'
const Toast = () => {
  return (
    <Box >
        <ToastContainer position="top-center" toastStyle={{borderRadius:15,padding:4,boxShadow:'10px'}}/>
    </Box>
  )
}

export default Toast