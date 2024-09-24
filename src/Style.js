import styled from 'styled-components'

export const HeaderContainer = styled.div`
  background-color: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  height: 60px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  width: 100vw;
  overflow-x: hidden;
`

export const SidebarContainer = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    width: 20%;
    background-color: ${props => (props.darkTheme ? '#181818' : '#fff')};
    padding: 10px 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 60px); /* Full height minus header */
    position: fixed;
    top: 60px;
    left: 0;
  }
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;
  padding: 10px;

  &:hover {
    transform: scale(1.02);
    background-color: ${props => (props.darkTheme ? 'black' : '#d7dfe9')};
    border-radius: 8px;
  }
`

export const Heading = styled.h1`
  color: ${props => (props.darkTheme ? 'white' : 'black')};
  font-size: 18px;
  margin: 5px;
`

export const ContactUs = styled.h1`
  font-size: 28px;
  color: ${props => (props.darkTheme ? 'white' : '#1e293b')};
  font-weight: bold;
`

export const Content = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${props => (props.darkTheme ? 'white' : '#383838')};
`

export const HomeBgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.darkTheme ? '#424242' : 'white')};
`

export const HomeContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-top: 70px;
  width: 100%;
  background-color: ${props => (props.darkTheme ? '#424242' : 'white')};
`

export const Container = styled.div`
  background-color: black;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`

export const DataContainer = styled.div`
  width: 100%;
  height: calc(100vh - 70px); /* Full height minus header */
  padding-top: 60px;
  background-color: ${props => (props.darkTheme ? 'black' : '#f1f1f1')};
  border-radius: 10px;
  overflow-y: auto;

  @media screen and (min-width: 768px) {
    width: 80%;
    margin-left: 20%; /* Add margin to avoid overlap */
    padding: 10px;
    overflow-y: auto;
    height: calc(100vh - 60px); /* Full height minus header */
  }
`
export const ApiDataContainer = styled.div`
  background-color: ${props => (props.darkTheme ? 'black' : 'white')};
  padding: 10px;
  width: 100%;
  border-radius: 10px;
`

export const TitleHeading = styled.h1`
  margin-top: 10px;
  font-size: 18px;
  color: ${props => (props.darkTheme ? 'white' : 'black')};
`

export const ChannelName = styled.p`
  font-size: 16px;
  color: ${props => (props.darkTheme ? '#e2e8f0' : '#475569')};
  margin: 0;
`

export const PublishedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#475569')};
`

export const FailureBgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 10px;
  margin-left:30px;
  background-color:${props => (props.darkTheme ? 'black' : 'white')}
  border-radius:10px;
  
`

export const SearchResultsHeading = styled.h1`
  font-size: 24px;
  color: ${props => (props.darkTheme ? 'red' : 'red')};
`

export const SearchResultsContent = styled.h1`
  font-size: 18px;
  color: ${props => (props.darkTheme ? '#e2e8f0' : 'black')};
`

export const TopIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${props => (props.darkTheme ? '#383838' : '#e2e8f0')};
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    background-color: skyblue;
    border-radius: 8px;
  }
`

export const NormalHeading = styled.h1`
  color: ${props => (props.darkTheme ? 'white' : 'black')};
  font-size: 24px;
`

export const StyledHeading = styled.h1`
  font-size: 8px;
  color: ${props => (props.darkTheme ? 'white' : '#00306e')};
  font-weight: bold;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`

export const StyledDescription = styled.p`
  font-size: 8px;
  color: ${props =>
    props.darkTheme ? 'white' : 'black'}; /* Color based on props */

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: ${props => (props.darkTheme ? 'black' : 'white')};
  border-radius: 8px;
  padding: 8px;
`

export const StyledHr = styled.hr`
  height: 4px; /* Set height */
  background-color: gray; /* Set color */
  border: none; /* Remove default border */
  margin: 10px 0; /* Optional: Add some margin */
`
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px; /* Adjust this based on your header */
  background-color: ${({darkTheme}) => (darkTheme ? '#1c1c1c' : '#f9f9f9')};
  color: ${({darkTheme}) => (darkTheme ? '#f9f9f9' : '#1c1c1c')};
  padding: 20px;
  height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({darkTheme}) => (darkTheme ? '#1c1c1c' : '#f9f9f9')};
  padding: 20px;
  border-radius: 8px;
  color: ${({darkTheme}) => (darkTheme ? '#f9f9f9' : '#1c1c1c')};
  height: 300px;
`
