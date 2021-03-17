import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';



function App() {

  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [drop, setDrop] = useState("all");
  const [text, setText] = useState("");
  const [fText, setFtext] = useState("");
  const [date, setDate] = useState();
  const [result, setResult] = useState(false);
  const [filterResult, setFilterResult] = useState(false);

  //user search functions
  const handleClick = (e) =>{
    e.preventDefault();
   
    setText("");
    if(drop==="all"){
      setPosts(post.filter(function(posts){
        return posts["Course Id"]>0
      }));
      setFilterResult(false);
    }
    else if(drop==="provider"){
          const a=text.toLowerCase();
        setPosts(post.filter(function(posts) {
          return posts.Provider.toLowerCase()===a;
        }));
        setResult(true);
        setFilterResult(false);
     }
    else if(drop==="child sub"){
      const a=text.toLowerCase();
      setPosts(post.filter(function(posts) {
        return posts["Child Subject"].toLowerCase()===a;
      }));
      setResult(true);
      setFilterResult(false);
   
    }
    else if(drop==="sess time"){
      setPosts(post.filter(function(posts) {
        if(posts["Next Session Date"].length===14){
          const b=posts["Next Session Date"].substr(0,2)+" "+posts["Next Session Date"].substr(5,3)+" "+posts["Next Session Date"].substr(-4);
          const a=Date.parse(date);
          const c=Date.parse(b)+19800000;
           return c===a;
        } 
        else if(posts["Next Session Date"].length===13){
          const b=posts["Next Session Date"].substr(0,1)+" "+posts["Next Session Date"].substr(4,3)+" "+posts["Next Session Date"].substr(-4);
          const a=Date.parse(date);
          const c=Date.parse(b)+19800000;
           return c===a;
        }
      })
      
      );
      setResult(true);
      setFilterResult(false);
  }
  else if(drop==="courses"){
    const a=text.toLowerCase();
    setPosts(post.filter(function(posts) {
      return posts["Course Name"].toLowerCase()===a;
    }));
    setResult(true);
    setFilterResult(false);
  }
}

//filter and sorting functions
  const filter1 = () =>{
    const a=text.toLowerCase();
    setPosts(posts.filter(function(data) {
      return data.Provider.toLowerCase()===a;
      })
    );
    setResult(true);
    setFtext("");
    setFilterResult(true);
  }

  function acompare(a, b) {
    
    const lengthA = a.Length;
    const lengthB = b.Length;
  
    let comparison = 0;
    if (lengthA > lengthB) {
      comparison = 1;
    } else if (lengthA < lengthB) {
      comparison = -1;
    }
    return comparison;
  }

  function dcompare(a, b) {
    
    const lengthA = a.Length;
    const lengthB = b.Length;
  
    let comparison = 0;
    if (lengthA > lengthB) {
      comparison = -1;
    } else if (lengthA < lengthB) {
      comparison = 1;
    }
    return comparison;
  }

 

  const sortA = () =>{
    setPosts(posts.sort(acompare));
    setResult(true);
    setFilterResult(true);

  }

  const sortB = () =>{
    setPosts(posts.sort(dcompare));
    setResult(true);
    setFilterResult(true);

  }

  //api endpoint call
  useEffect(()=>{
    axios.get('http://nut-case.s3.amazonaws.com/coursessc.json')
    .then(res=>{
      setPost(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
    
  },[])


  return (
    <div className="App">
      <div className="navbar">
        <div className="tag">
          <h1>Course Finder</h1>
        </div>
      
       <div className="searchbar">
            {(drop==="provider")?<div className="options">
                          <select onChange={(e)=>{setDrop(e.target.value)}}>
                          <option value="all">All Courses</option>
                          <option value="provider">Provider</option>
                          <option value="child sub">Child Subject</option>
                          <option value="sess time"> Next Session</option>
                          <option value="courses"> Courses</option>
                          </select>
                          
                          <input type="text" value={text}  onChange={e => setText(e.target.value)} placeholder="Provider Name"/>
                    
                          <button type="button"  onClick={handleClick}>Search</button>
                        </div>
                          :
              (drop==="child sub") ?<div className="options">
                          <select onChange={(e)=>{setDrop(e.target.value)}}>
                          <option value="all">All Courses</option>
                          <option value="provider">Provider</option>
                          <option value="child sub">Child Subject</option>
                          <option value="sess time"> Next Session</option>
                          <option value="courses"> Courses</option>
                          </select>
                          
                          <input value={text}  onChange={e => setText(e.target.value)} placeholder="Child Subject Name"/>
                  
                          <button type="submit" onClick={handleClick}>Search</button>
                        </div>
                :
              (drop==="all")?<div className="options">
                          <select onChange={(e)=>{setDrop(e.target.value)}}>
                          <option value="all">All Courses</option>
                          <option value="provider">Provider</option>
                          <option value="child sub">Child Subject</option>
                          <option value="sess time"> Next Session</option>
                          <option value="courses"> Courses</option>
                          </select>
                          
                          <input type="text" value={text}  onChange={e => setText(e.target.value)} placeholder="Click Search to get all courses" disabled/>
                
                          <button type="submit" onClick={handleClick}>Search</button>
                        </div>
                        :
              (drop==="sess time")?<div className="options">
                          <select onChange={(e)=>{setDrop(e.target.value)}}>
                          <option value="all">All Courses</option>
                          <option value="provider">Provider</option>
                          <option value="child sub">Child Subject</option>
                          <option value="sess time"> Next Session</option>
                          <option value="courses"> Courses</option>
                          </select>
                  
                          <input type="date" value={date}  onChange={e => setDate(e.target.value)} />

                          <button type="submit" onClick={handleClick}>Search</button>
                        </div>
                        :
                        <div className="options">
                          <select onChange={(e)=>{setDrop(e.target.value)}}>
                          <option value="all">All Courses</option>
                          <option value="provider">Provider</option>
                          <option value="child sub">Child Subject</option>
                          <option value="sess time"> Next Session</option>
                          <option value="courses"> Courses</option>
                          </select>
                  
                          <input type="text" value={text}  onChange={e => setText(e.target.value)} placeholder="Enter Course Name"/>

                          <button type="submit" onClick={handleClick}>Search</button>
                        </div>
                        }
        </div>
      </div>
        
      <div>
         {posts.length>0?<div>
                            {(filterResult===false)?
                            <div className="filter">
                                    <h1>{posts.length} courses found</h1>
                                    <div>
                                      <h4>Filter by Provider</h4>
                                       <input type="text" value={fText}  onChange={e => setFtext(e.target.value)} placeholder="Enter Provider Name" />
                                       <button type="submit" onClick={filter1} className="filbut">></button>
                                       <h4>Sort by length</h4>
                                       <button type="submit" onClick={sortA} className="ascsort">&#8593;</button> 
                                       <button type="submit" onClick={sortB} className="descsort">&#8595;</button> 
                                    </div>
                            </div>:null}
                                  
                            <table border="1" cellSpacing="10" cellPadding="10">
                                <thead>
                                    <tr>
                                      <th>Course Name</th>
                                      <th>Provider</th>
                                      <th>University</th>
                                      <th>Parent Sub</th>
                                      <th>Child Sub</th>
                                      <th>Next Session</th>
                                      <th>Length</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                      {
                                        posts.map(post => <tr>
                                          <td>{post["Course Name"]}</td>
                                          <td>{post.Provider}</td>
                                          <td>{post["Universities/Institutions"]}</td>
                                          <td>{post["Parent Subject"]}</td>
                                          <td>{post["Child Subject"]}</td>
                                          <td>{post["Next Session Date"]}</td>
                                          <td>{post.Length}</td>
                                      </tr>)
                                      }
                                    </tbody>
                            </table>
                          </div>
                                :result===true?<h1 className="nores">No Results Found</h1>:null}
                  </div>
          </div>
  );
 }

export default App;


