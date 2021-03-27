import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import CartaoOrientacao from '../../layout/CartaoOrientacao';
import imgFluor from '../../assets/fluor.jpg';
import imgAthleteRest from '../../assets/athlete-rest.jpg';
import imgDentistApp from '../../assets/dentist-app.jpg';
import imgAthleteWater from '../../assets/athlete-water.jpg';
import imgBrushTeeth from '../../assets/brush-teeth.jpg';
import imgToothbrushFlossFLuor from '../../assets/toothbrush-floss-fluor.jpg';
import imgAvoidSugar from '../../assets/avoid-sugar.jpg';
import imgHighSugar from '../../assets/high-sugar.jpg';

const Orientacoes = (p) => {

    const user = p.app.state.user;

    return (
        <div>

            <div className="main-container">

                <div className="container">

                    <div className="row">
                        <div className="col-md mb-3" style={{textAlign: "center"}}>
                            <h2 className="mb-1">Orientações</h2>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInLeft' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgHighSugar}
                            texto={`O consumo frequente de alimentos com alto teor de açúcar aumenta o risco de cárie.
                            O consumo frequente de bebidas ou suplementos ácidos aumenta o risco de erosão dentária.`}
                          />            
                        </ScrollAnimation>
                      </div>
                    </div>

                   {(user && user.atleta === 'S') 
                   ? 
                   <div className="row">
                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInRight' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgAthleteRest}
                            texto={`Em períodos que não esteja em treinamento ou competição, 
                            evite consumir bebidas e suplementos contendo açúcares que prejudicam a saúde bucal, 
                            e procure orientação especializada com nutricionista em esportes. 
                            É importante priorizar o consumo de alimentos, sempre que possível, 
                            reduzindo o consumo de suplemento ricos em açúcar.`}
                          />            
                        </ScrollAnimation>
                      </div>    
                      
                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInLeft' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgFluor}
                            texto={`Se costuma consumir com frequência suplementos ácidos ou com açúcares, 
                            a higiene bucal deve ser feita de preferência com creme dental com concentração de 2.800 ppm de flúor, 
                            duas vezes ao dia e antes de dormir. Caso não tenha produtos com esta concentração de flúor disponível, 
                            pode ser usado creme dental com no mínimo 1.350 ppm de flúor. 
                            Após a escovação dos dentes, cuspir mas não enxaguar para aproveitar melhor os benefícios da ação do flúor. 
                            O enxaguatório bucal com concentração de 0,05% de fluoreto de sódio é indicado para ser usado.`}
                          />            
                        </ScrollAnimation>
                      </div>    
                      
                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInRight' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgDentistApp}
                            texto={`A correta higiene oral e limpeza interdental deve ser orientada pelo dentista 
                            em consultas regulares durante o ano e principalmente em períodos fora das competições esportivas. `}
                          />            
                        </ScrollAnimation>
                      </div>  

                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInLeft' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgAthleteWater}
                            texto={`Logo após suplementar com bebida esportiva, 
                            ingerir imediatamente água. É importante disponibilizar duas garrafas durante o exercício, 
                            uma delas contendo o suplemento e outra composta por água.`}
                          />            
                        </ScrollAnimation>
                      </div> 
                    </div>
                    : 
                    <div className="row">
                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInRight' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgBrushTeeth}
                            texto={`Mantenha o hábito de escovar os dentes diariamente após as refeições e antes de ir dormir.`}
                          />            
                        </ScrollAnimation>
                      </div>  

                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInLeft' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgToothbrushFlossFLuor}
                            texto={`Utilize escova dental de tamanho adequado, com cerdas macias e creme dental com flúor. 
                            Utilize também o fio dental para complementar a higiene bucal.`}
                          />            
                        </ScrollAnimation>
                      </div> 

                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInRight' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgAvoidSugar}
                            texto={`Mantenha hábitos alimentares saudáveis, evite alimentos doces ricos em açúcar 
                            e controle a frequência do consumo destes alimentos, principalmente no horário entre as refeições.`}
                          />            
                        </ScrollAnimation>
                      </div>

                      <div className="col-lg-6 offset-lg-3 mt-3"> 
                        <ScrollAnimation animateIn='bounceInLeft' animateOnce={true}>
                          <CartaoOrientacao
                            imagem={imgDentistApp}
                            texto={`Consulte o dentista regularmente, pelo menos duas vezes ao ano.`}
                          />            
                        </ScrollAnimation>
                      </div>  
                    </div>}

                </div>    

            </div>

        </div>
    );
}

export default Orientacoes;