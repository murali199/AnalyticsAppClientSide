import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
} from "antd";

import project1 from "../assets/images/j2ee.png";
import project2 from "../assets/images/r_prog.jpg";
import project3 from "../assets/images/react.png";
import project4 from "../assets/images/mysql.png";
import { Link } from "react-router-dom";

function Analytics() {

  const Languages = [
    {
      img: project1,
      titlesub: "Lang #1",
      title: "J2EE",
      disciption:
        "Java 2 Platform, Enterprise Edition (J2EE), is a set of specifications, extending Java SE[1] with specifications for enterprise features such as distributed computing and web services.[2] Jakarta EE applications are run on reference runtimes, that can be microservices or application servers, which handle transactions, security, scalability, concurrency and management of the components it is deploying.",
    },
    {
      img: project2,
      titlesub: "Lang #2",
      title: "R Programming",
      disciption:
        "The official R software environment is an open-source free software environment within the GNU package, available under the GNU General Public License. It is written primarily in C, Fortran, and R itself (partially self-hosting). Precompiled executables are provided for various operating systems. R has a command line interface. Multiple third-party graphical user interfaces are also available, such as RStudio, an integrated development environment, and Jupyter, a notebook interface.",
    },
    {
      img: project3,
      titlesub: "Lang #3",
      title: "React",
      disciption:
        "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[3] for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM.",
    },
    {
      img: project4,
      titlesub: "Lang #4",
      title: "MySql",
      disciption:
        "A relational database organizes data into one or more data tables in which data types may be related to each other; these relations help structure the data. SQL is a language programmers use to create, modify and extract data from the relational database, as well as control user access to the database. In addition to relational databases and SQL, an RDBMS like MySQL works with an operating system to implement a relational database in a computer's storage system.",
    },
  ];

  const linkFunction = (index) => {
    if(index == 0)
    window.open('https://en.wikipedia.org/wiki/Jakarta_EE');
    else if(index == 1)
    window.open('https://en.wikipedia.org/wiki/R_(programming_language)');
    else if(index == 2)
    window.open('https://en.wikipedia.org/wiki/React_(JavaScript_library)');
    else if(index == 3)
    window.open('https://en.wikipedia.org/wiki/MySQL');
  }

  return (
    <>
            <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Languages</h6>
            <p>Programming languages that are used in this JAVA - R analytics application</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {Languages.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} height="300"/>}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.title}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button" onClick={() => linkFunction(index)}>READ MORE</Button>
                  </Col>
    
                </Row>
              </Card>
            </Col>
          ))}
          
        </Row>
      </Card>
    </>
  );
}

export default Analytics;
