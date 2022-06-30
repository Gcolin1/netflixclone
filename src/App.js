import './App.css';
import React, {useEffect, useState} from 'react';
import tmdb from './tmdb'
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

export default () => {


  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)


  useEffect(() => {
      const loadAll = async () => {
        //Pegando a lista total 
        let list = await tmdb.getHomeList();
        setMovieList(list)//mandando as informações da lista de filmes para o USESTATE na função setMovieList

        //Pegando o filme em destaque (Featured)
        let originals = list.filter(i => i.slug === 'originals'); //pegando os filmes que são originais netflix de acordo com a array
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))//pegando numero aleatorio
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await tmdb.getMovieinfo(chosen.id, 'tv');
        setFeatureData(chosenInfo)

      }

      loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return(
    <div className='page'>

      <Header black={blackHeader} />

      { featureData &&
          <FeatureMovie item={featureData}/>
      }

      
      <section className='lists'>
        {movieList.map((item, key) =>(
          <div>
              <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>
    </div>
  );

}
