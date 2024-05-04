import React from 'react'
import JobCard from './MuiCardTest';


const MuiComp = () => {

    const jobData = {
        title: "Android Developer",
        company: "MasterCard",
        description: "This is a sample job and you must have displayed it to understand that it's not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        salaryLow: 102,
        salaryHigh: 103,
        experience: '1 - 3 years',
        logoUrl: "https://logo.clearbit.com/mastercard.com",
        jobLink: "https://weekday.works",
        location: "Remote",
        jobRole: "Android Developer",
        jdUid: "cfff3dcb-053c-11ef-83d3-06301d0a7178-92076"
      };
      

  return (

<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
  <JobCard key={jobData.jdUid} job={jobData} />
</div>

  )
}

export default MuiComp