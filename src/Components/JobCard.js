import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Modal,
  Link
} from '@mui/material';

const JobCard = ({ job }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <Card sx={{maxWidth: 345, m: 2, boxShadow: 3, borderRadius: 5}}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip label="⌛ Posted a month ago" size="small" sx={{ borderRadius: 16, background:'#fff', border:'1px solid #ddd' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box component="img" src={job.logoUrl} alt={`${job.company} Logo`} sx={{ width: 56, height: 56, borderRadius: '50%', mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: '500', color: "#8b8b8b" }}>{job.companyName}</Typography>
              <Typography variant="h7" color="text.primary">{job.jobRole}</Typography>
              <Typography variant="body2" sx={{ color: '#000'}}>{job.location}</Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
            Estimated Salary: ${job.minJdSalary > 0 ? job.minJdSalary : 0}k - ${job.maxJdSalary}k ✅
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, color: '#000' }}>About Company:</Typography>
          <Typography variant="h7" color="text.secondary" sx={{ fontWeight: 600, color: '#000' }}>About us</Typography>
          <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'relative' }}>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                width: '100%',
                height: '138px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {job.jobDetailsFromCompany}
            </Typography>
            <Button onClick={handleOpen} variant="contained" sx={{ width:'300px', position:'absolute', bottom:'5%', flexGrow: 1, background:"rgba(255, 255, 255, 0.8)", color:"blue", boxShadow:'10px -30px 2px 40px rgba(255, 255, 255, 0.8)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow:'10px -26px 2px 40px rgba(255, 255, 255, 0.8)' } }}>
              View Job
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '70%',
                sm: '80%',
                md: '70%',
                lg: '50%',
                xl: '50%'
              },
              height:'400px',
              overflowY: 'scroll',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}>
              <Typography variant="h6" component="h2">{job.companyName}</Typography>
              <Typography variant="subtitle1">{job.jobRole} - {job.location}</Typography>
              <Box component="img" src={job.logoUrl} alt={`${job.companyName} Logo`} sx={{ width: 100, height: 100, borderRadius: '50%', my: 2 }} />
              <Typography variant="body1">
                Salary: ${job.minJdSalary > 0 ? job.minJdSalary : 0}k - ${job.maxJdSalary}k ✅
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, color: '#8b8b8b' }}>Minimum Experience:</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}> 
                {job.minExp > 0 ? job.minExp + ' Years' : 'Entry Level'} 
              </Typography>
              <Typography variant="body2" sx={{ my: 2 }}>
                {job.jobDetailsFromCompany}
              </Typography>
              <Link href={job.jdLink} target="_blank" rel="noopener noreferrer" sx={{ mt: 2 }}>
                View Job Posting
              </Link>
            </Box>
          </Modal>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, color: '#8b8b8b' }}>Minimum Experience:</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}> 
            {job.minExp > 0 ? job.minExp + ' Years' : 'Entry Level'} 
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="contained"  sx={{ flexGrow: 1, background:"#55EFC4", color:"#000", '&:hover': { backgroundColor: '#55EFC4', boxShadow: 'none' } }}>
             ⚡ Easy Apply
            </Button>
            <Button variant="contained" color="primary" sx={{ flexGrow: 1, background:"#4844e5", color:"#fff", '&:hover': { backgroundColor: '#4844e5', boxShadow: 'none' } }}>
              Ask for referral
            </Button>
          </Box>
        </CardContent>
      </Card>
  );
};

export default JobCard;
