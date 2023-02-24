import { Card,Col } from "antd";
import Link from "next/link";
import { mdiStar } from '@mdi/js';
import Icon from "@mdi/react";
const { Meta } = Card;
const index = ({srcImage, title, id, year, description, vote, direccion, genero, tipoDeCarta }) => {
    return (
        <Col span={5} className="Col_Cards" >
            <Card className={tipoDeCarta? "Cards": "CardsHorizontal"}  hoverable >
            <img className={tipoDeCarta? "Cards_Images": "CardsHorizontal_Images"} src={srcImage}/>
                <Link className={tipoDeCarta? "Cards_Ver": "CardsHorizontal_Ver"} href={`/${direccion}/${id}`} >
                 <div className={tipoDeCarta? "Cards_Body": "CardsHorizontal_Body"}>
                    <div className={tipoDeCarta? "Cards_Body_Title": "CardsHorizontal_Body_Title"}>{title}</div>
                    <div className={tipoDeCarta? "Cards_Body_Year": "CardsHorizontal_Body_Year"}>{year}</div>
                    <div className={tipoDeCarta? "Cards_Body_Vote": "CardsHorizontal_Body_Vote"}><Icon size={1} style={{ marginRight: 2}} path={mdiStar} />{vote}</div>
                    {tipoDeCarta? (<>  
                    <div className="Cards_Body_Description">{description}</div>
                    <div className="Cards_Body_Genres">{genero}</div>
                    </>): ''}
                  
                 </div>
                </Link>
             
            </Card>
        </Col>
    );
};

export default index;