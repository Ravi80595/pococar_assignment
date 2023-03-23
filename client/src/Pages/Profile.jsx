import React, { useEffect, useState } from 'react'
import {Box,Text,Image,Flex} from '@chakra-ui/react'
import axios from 'axios'
import {baseUrl} from '../Utils/BaseUrl'

const Profile = () => {
    const {accessToken}=JSON.parse(localStorage.getItem("pococareToken"))
    const [data,setData]=useState([])

useEffect(()=>{
    getProfile()
},[])

const getProfile=()=>{
    axios.get(`${baseUrl}/user/profile`,{
        headers:{
            Authorization :`Bearer ${accessToken}`
        }
    })
    .then((res)=>{
        console.log(res)
        setData([res.data.User])
    })
}

return (
    <Box mt={20}>
      {/* <Text pt='145px' textAlign='center' pb={5}>Front Side</Text> */}
      {
        data && data.map(ele=>(
          <>
      <Box mt={20} h={300} pt={10} borderRadius={20} backgroundImage={'https://static.wixstatic.com/media/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg/v1/fill/w_1024,h_784,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg'} w={['95%','95%','95%','45%']} m='auto'  pb={3}>
        <Flex justifyContent='space-around'>
          <Image ml={5} mr={5} w={150} src='https://avatars.githubusercontent.com/u/63177572?v=4' />
          <Box>
          <Flex justifyContent='space-between'>
          <Text>First Name</Text>
          <Text textAlign='center'>{ele.firstName}</Text>
          </Flex>
          <Flex pt={5} justifyContent='space-between'>
          <Text>Last Name </Text>
          <Text textAlign='center'>  {ele.lastName}</Text>
          </Flex>
          </Box>
        </Flex>
        <Flex w='80%' m='auto' pt={5}>
            <Box></Box>
            <Box>
          <Text pl={5} textAlign='center'>हस्ताक्षर/Signature</Text>
          <Text pt={5} textAlign='center' fontFamily="cursive">{ele.firstName}</Text>
            </Box>
        </Flex>
      </Box>
      </>
      ))
    }
    </Box>
  )
}

export default Profile
