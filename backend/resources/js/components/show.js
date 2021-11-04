import React from 'react';
import { useState,useEffect } from 'react';
import { Link,useHistory } from "react-router-dom";
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import golfIcon from './image/golf1_animated_300.gif';
import LoadingInterface from './LoadingInterface';

function Show(props) {
  const[golf,setGolf] = useState([{id: "",name: "",address: "",price: "",courseInfo: "",phone: "",hp:"",moreInfo:"",image:"",lat:0,lng:0}]);
  const history = useHistory();
  const[load,setLoad] = useState(true);

  const DetailShow = styled.div `
    width:500px;
    margin:10px auto;
  `
  const Gif = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:500px;
    background-color: white;
  `
  
  const BackArrow = styled.div`
    width: 16px;
    height: 19px;
  `;

  const Back = styled.button`
  width: 16px;
  height: 19px;
  text-align:right;
`;

  const Image = styled.img `
    width: 390px;
    height: 100%;
    margin: 12px 0;
    object-fit:cover;
  `;

  const Rectangle6 = styled.div `
    width: 390px;
    height: 257px;
    padding: 18px 0 22px 0;
    background-color: #fff;
  `;

  const Text = styled.div `
    margin-top:18px;
    margin-left:30px;
  `;
  
  const Name = styled.p`
    width: 264px;
    margin: 0 96px 11.8px 9px;
    font-family: 'Noto Serif JP', serif;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    color: #333;
  `;

  const Maker = styled.p`
    width: 351px;
    margin: 5px 0 8px 18px;
    font-family: 'Noto Serif JP', serif;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #040404;
  `;

  const StartDay = styled.p`
    width: 142px;
    margin: 5px 78px 11.8px 18px;
    font-family: 'Noto Serif JP', serif;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #040404;
  `;

  const Content = styled.p `
    width: 112px;
    margin: 5px 108px 5px 18px;
    font-family: 'Noto Serif JP', serif;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    color: #040404;
  `;

  useEffect(()=>{
    const file = new FormData()
    file.append("id", props.id);
    axios.post('http://localhost/api/golf/search',file)
    .then(res => {
      setGolf(res.data);
      console.log(res.data);
      setLoad(false);
    })
  },[])

  function handleClick(event) {
    history.push({
      pathname: '/edit/' + event.target.value
    });
  }

  const image = (img) => {
    const image_path = "storage/image/" + img;
    return(
      <Image src={image_path}/>
    );
  }

  const loading = () => {
    if(load){
      return(
        <p></p>
      )
    }
  }

  return(
    <>
      <DetailShow>
        {load?
          <Gif>
            <img src={golfIcon}></img>
          </Gif>
        :
        <>
        <BackArrow>＜</BackArrow>
        <Back onClick={handleClick} value={golf.id}>:</Back>
        {image(golf.image)}
        <Rectangle6>
          <Text>
          <Name>
            {golf.name}
          </Name>
          <Maker>
            {golf.address}
          </Maker>
          <StartDay>
            {golf.price}
          </StartDay>
          <Content>
            {golf.courseInfo}
          </Content>
          <Content>
            電話番号：{golf.phone}
          </Content>
          </Text>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{my:5}}>
            <Link to={golf.hp}>
              <Button variant="contained" color="primary">
                公式
              </Button>
            </Link>
            <Link to={golf.moreInfo}>
              <Button variant="contained" color="warning">
                詳細情報
              </Button>
            </Link>
          </Stack>
        </Rectangle6>
        </>
        }
      </DetailShow>
    </>
  );
}

export default Show;