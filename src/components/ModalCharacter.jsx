
const Character = ({data,setIsModal,isModal}) => {
    const handleModal = () => {
        setIsModal(!isModal);
      };
    return(
        <>
        <div className="Blur"></div>
          <div className="character-card-modal" onClick={handleModal}>
         <img src={data.image} alt="" />
         <div className="card_body">
         <h2>Name: {data.name}</h2>
         <h3>Status: {data.status}</h3>
         <h3>
             <span>Species: {data.status}</span>
         </h3>
         <h3>Origin: {data.origin.name}</h3>
            
         <ol>
         <h3>Episodes</h3>
             <a href={data.episode[0]}>Episode: 1</a>
             <br />
             { 
                 data.episode[1]? 
                 <a href={data.episode[1]}>Episode: 2</a>
                 :" "

             }
             <br />
             {
                   data.episode[2]?  
             <a href={data.episode[2]}>Episode: 3</a>
                 :" "
             }
                
         </ol>
         </div>
            
         </div> 
        </> 
    )
    
}

export default Character