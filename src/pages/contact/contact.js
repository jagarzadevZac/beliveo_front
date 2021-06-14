import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Demo() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [mensaje, setMensaje] = useState("");

    const url = (window.location.hostname === 'localhost') ? 'http://localhost:1337/sendmessage' : 'https://backend.mayofy.com/sendmessage';

    const onSubmit = (data,e) => {
        console.log(JSON.stringify(data));
        // let dataForm = JSON.stringify(data);
        console.log(data);
        axios({
            method: 'post',
            url: url,
            data: data
        }).then((res) =>{
            if(res.status === 200){
                e.target.reset()
                setMensaje("hemos recibido tu correo , nos pondremos en contacto a la brevedad posible")
            }else{
                setMensaje("Ocurrió un erro al enviar el correo.")
            }
        } )
    };
    console.log(errors);
    return (
        <>
            <section className="bg-light">
                <Pageheading foldername={"Paginas"} title={"Contacto"} />
            </section>
            <div className="page-content">
                <section>
                    <Container>
                        <Row className="mb-5">
                            <div className="col-lg-8">
                                <div className="mb-5">
                                    <h6 className="text-primary mb-1">— Contáctenos</h6>
                                    <h2 className="mb-0">Nos encantaría saber de ti.</h2>
                                    <div className="text-primary mb-1"> {mensaje}</div>
                                </div>
                                <form id="contact-formTTT" className="row" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="messages" />
                                    <div className="form-group col-md-6">
                                        <label>Nombre<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" placeholder="First Name"  {...register('firstName', { required: true, maxLength: 80 })} />
                                        {errors.firstName && <span><div className="help-block with-errors">El nombre es requrido</div></span>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" placeholder="Name"  {...register('name', { required: true, maxLength: 80 })} />
                                        {errors.name && <span><div className="help-block with-errors"> EL segudo nombre o apellido es requerido</div></span>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Correo<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" placeholder="Email"  {...register('Email', { required: true, maxLength: 80 })} />
                                        {errors.Email && <span><div className="help-block with-errors">El correo electronico es requerido</div></span>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Telefono <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" placeholder="phone"  {...register('phone', { required: true, maxLength: 80 })} />
                                        {errors.phone && <span><div className="help-block with-errors">El número telefonico es requerido</div></span>}
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Mensaje <span className="text-danger">*</span></label>
                                        <textarea type="text" className="form-control" placeholder="Message"  {...register('Message', { required: true, maxLength: 80 })} />
                                        {errors.Message && <span><div className="help-block with-errors">El mensaje es requerido</div></span>}
                                    </div>
                                    <Col md={12} className="mt-4">
                                        <button className="btn btn-primary btn-animated" type="submit">Submit</button>
                                    </Col>
                                </form>
                            </div>
                            <Col lg={4} className="mt-6 mt-lg-0">
                                <div className="shadow-sm rounded p-5">
                                    <div className="mb-5">
                                        <h6 className="text-primary mb-1">— Datos de contacto</h6>
                                        <h4 className="mb-0">Estamos aquí para ayudarte</h4>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="mr-2"> <i className="las la-map ic-2x text-primary" />
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark">Dirección de la tienda</h6>
                                            <p className="mb-0 text-muted">Av. Calz. Lázaro Cárdenas 2305, interior C, Las Torres, 44920 Guadalajara, Jal</p>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="mr-2"> <i className="las la-envelope ic-2x text-primary" />
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark">Contàctanos</h6>
                                            <a className="text-muted" href="mailto:themeht23@gmail.com"> venta@ecommpos.com</a>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="mr-2"> <i className="las la-mobile ic-2x text-primary" />
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark">Nùmero telefòniNco</h6>
                                            <a className="text-muted" href="tel:+912345678900">+33-111-111-1111</a>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-5">
                                        <div className="mr-2"> <i className="las la-clock ic-2x text-primary" />
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-dark">Horario</h6>
                                            <span className="text-muted">Lunes - Viernes: 08AM - 6PM</span>
                                        </div>
                                    </div>
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-facebook" /></Link>
                                        </li>
                                        <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-dribbble" /></Link>
                                        </li>
                                        <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-instagram" /></Link>
                                        </li>
                                        <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-twitter" /></Link>
                                        </li>
                                        <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-linkedin" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="pt-0">
                    <Container>
                        <hr className="mt-0 mb-10" />
                        <Row className="justify-content-center text-center mb-5">
                            <div className="col-lg-8">
                                <div>
                                    <h6 className="text-primary mb-1">— Encuentranos</h6>
                                    <h2 className="mb-0">Ubicación de nuestra tienda</h2>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <div className="map" style={{ height: '500px' }}>
                                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840108181602!2d144.95373631539215!3d-37.8172139797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1497005461921" allowFullScreen className="w-100 h-100 border-0" /> */}
                                    <iframe  title="mapDir" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.367365271559!2d-103.38131448480252!3d20.65462800582018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ade72ed285fd%3A0x10c02e7dc482ca80!2sCalz.%20L%C3%A1zaro%20C%C3%A1rdenas%202305%2C%20Las%20Torres%2C%2044920%20Guadalajara%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1621893968031!5m2!1ses-419!2smx" allowFullScreen className="w-100 h-100 border-0" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </div>
        </>
    );
}

export default React.memo(Demo);