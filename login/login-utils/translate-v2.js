function translate(texto,lg){
	var idioma;
	if(lg==undefined || lg==null || lg==''){
		idioma='ES';
	}else{
		idioma=lg;
	}
	switch(idioma.toUpperCase()){
		case 'ES':{
			switch(texto.toLowerCase()){
				case "user_is_not_allowed_to_login":{
					return "Usuario no tiene permitido loguearse"
				}break;
				case "otp_ccr_is_needed":{
					return "El otp es requerido";
				}break;
				case "financial_card_emitter_not_found":{
					return "Emisor no encontrado";
				}break;
				case "payment_card_already_registered":{
					return "tarjeta ya registrada";
				}break;
				case "deegle_pay_payment_card_is_pending_validation":{
					return "La tarjeta requiere ser validada antes de realizar cualquier pago. Para eso debe ingresar a la cuenta asociada a la tarjeta y colocar en el campo OTP el monto descontado";
				}break;
				case "invalid_otp_ccr":{
					return "Otp inválido";
				}break;
				case "deegle_pay_payment_card_is_already_validated":{
					return "La tarjeta ya ha sido validada";
				}break;
				case "deegle_pay_payment_card_is_locked":{
					return "Tarjeta bloqueada. Llamar a nuestro contact center: 0501-999-9999";
				}break;
				case "deegle_pay_payment_card_is_locked_too_many_tries":{
					return "La tarjeta ha sido bloqueada porque ha superado el máximo de intentos. Llamar a nuestro contact center: 0501-999-9999";
				}break;
				case "send_otp_ccr_first":{
					return "Envie primero el otp";
				}break;
				case "otp_ccr_is_expired":{
					return "otp expirado";
				}break;
				case "otp_ccr_is_expired":{
					return "otp expirado";
				}break;
				case "not_allowed_to_pass_payments_of_bins_not_found":{
					return "no se permiten pagos con tarjetas  internacionales";
				}break;
				case "alias_already_taken":{
					return "Alias ya se encuentra en uso";
				}break;
				case "no_collect_methods_found":{
					return "Método de colección no encontrado";
				}break;
				case "max_password_tries_user_blocked":{
					return "Detectamos que has alcanzado el máximo de intentos de ingresos fallidos y por seguridad hemos bloqueado tu usuario credicardpagos. para desbloquearlo puedes hacer click en *recuperar* o puedes llamar a nuestro contact center: 0501-999-9999."
				}break;
				case "token_expired":{
					return "token expirado"
				}break;
				case "invalid_currency":{
					return "moneda inválida";
				}break;
				case "banco_del_tesoro":{
					return "banco del tesoro";
				}break;
				case "no_collect_methods_allowed_for_this_card_emitter":{
					return "no hay afiliaciones que permitan este emisor de tarjeta";
				}break;
				case "no_collect_methods_allowed_for_this_schedule":{
					return "no hay afiliaciones disponibles para este horario";
				}break;
				case "username_not_found":{
					return "usuario no encontrado";
				}break;
				case "service_is_unavailable":{
					return "servicio no disponible";
				}break;
				case "bank_card_token_service_error":{
					return "error en solicitud de token";
				}break;
				case "bank_card_validator_service_error":{
					return "error en validacion de token";
				}break;
				case "bank_card_validator_service_error":{
					return "error en validacion de token";
				}break;
				case "bank_card_service_internal_error":{
					return "error interno del banco";
				}break;
				case "bank_card_service_data_error":{
					return "datos inválidos";
				}break;
				case "bank_invalid_token":{
					return "token inválido";
				}break;
				case "ves":{
					return "Bs";
				}break;
				case "usd":{
					return "$";
				}break;
				case "otp_ccr_is_needed":{
					return "El otp es requerido";
				}break
				case "card_holder_commission_config_not_found":{
					return "Configuración de comisión al tarjetahabiente no encontrada";
				}break;
				case "error_sending_otp_ccr":{
					return "Error enviando el otp";
				}break;
				case "operation_request_config_not_found":{
					return "configuración de operación no encontrada";
				}break;
				case "bancrecer_bank_card_validator_service_error":{
					return "bancrecer error";
				}break;
				case "bancamiga_bank_card_token_service_error":{
					return "bancamiga token error";
				}break;
				case "iso_server_not_available":{
					return "servidor iso no disponible";
				}break;
				case "must_specify_one_payment_method":{
					return "debe especificar un método de pago";
				}break;
				case "must_specify_only_one_payment_method":{
					return "debe especificar sólo un método de pago";
				}break;
				case "currency_not_found":{
					return "moneda no encontrada";
				}break;
				case "bank_code_does_not_match_card":{
					return "el código bancario no coincide con la tarjeta";
				}break;
				case "invalid_card_number":{
					return "número de tarjeta inválido";
				}break;
				case "bank_is_not_emitter":{
					return "el banco no es emisor";
				}break;
				case "invalid_id_doc_ve":{
					return "documento de identidad inválido";
				}break;
				case "error_not_parsed":{
					return "error no parseado";
				}break;
				case "empty_response":{
					return "respuesta vacía";
				}break;
				case "mi_banco_bank_card_token_service_error":{
					return "mi banco token error";
				}break;
				case "bancrecer_bank_card_validator_service_error":{
					return "bancrecer error";
				}break;
				case "bank_info_is_null":{
					return "la información del banco es nula";
				}break;
				case "no_rules_configured_for_this_bank":{
					return "no hay reglas de configuración para este banco";
				}break;
				case "fail_to_get_affiliation_number":{
					return "fallo al obtener número de afiliación";
				}break;
				case "invalid_affiliation_number":{
					return "número de afiliación inválido";
				}break;
				case "collect_method_has_no_affiliation_number":{
					return "el método de recepción no tiene número de afiliación";
				}break;
				case "bancrecer_bank_card_token_service_error":{
					return "bancrecer token error";
				}break;
				case "mi_banco_bank_card_validator_service_error":{
					return "mi banco error";
				}break;
				case "expided_token":{
					return "token expirado";
				}break;
				case "invalid_word_used_in_password":{
					return "palabra inválida usada en la clave, no use palabras que esten contenidas en el correo electrónico";
				}break;
				case "failed_request":{
					return "petición fallida";
				}break;
				case "invalid_bancrecer_config":{
					return "configuración Bancrecer inválida";
				}break;
				case "no_bank_validator_found_for_this_bank":{
					return "no existe validador para este banco";
				}break;
				case "service_user_code_is_invalid":{
					return "código de servicio inválido";
				}break;
				case "service_user_invalid":{
					return "servicio de usuario inválido";
				}break;
				case "phone_or_email_missing":{
					return "falta de correo electrónico o teléfono";
				}break;
				case "error_in_client":{
					return "error en cliente";
				}break;
				case "error_generating_token":{
					return "error generando token";
				}break;
				case "error_sending_token":{
					return "error enviando token";
				}break;
				case "error_validating_token":{
					return "error validando token";
				}break;
				case "there_is_not_an_active_token":{
					return "token no esta activo";
				}break;
				case "number_of_tries_has_been_surpassed":{
					return "se ha superado el número de intentos";
				}break;
				case "invalid_token":{
					return "Has ingresado uno o más datos inválidos, recuerda que por tu seguridad, luego de tres (3) intentos fallidos bloquearemos tu usuario de forma preventiva.";
				}break;
				case "expired_token":{
					return "token expirado";
				}break;
				case "token_has_been_used":{
					return "token ha sido usado anteriormente";
				}break;
				case "invalid_bank_card_validator_token":{
					return "token inválido";
				}break;
				case "invalid_identity_for_card":{
					return "el banco no valido la identidad del usuario asociado a esta tarjeta,dirijase a la entidad bancaria del emisor de la tarjeta para solventar el inconveniente";
				}break;
				case "error_in_parameters":{
					return "error en parámetros";
				}break;
				case "sending_token_is_not_supported_for_this_bank":{
					return "el envio del token no es soportado por este banco";
				}break;
				case "phone_is_necessary_for_payment_card_bank_validation":{
					return "El teléfono es necesario para validar la identidad de la tarjeta";
				}break;
				case "invalid_token_must_be_all_numeric":{
					return "Token inválido, sólo acepta caracteres numéricos";
				}break;
				case "id_doc_is_necessary_for_payment_card_bank_validation":{
					return "El documento de identidad es necesario para validar la identidad de la tarjeta";
				}break;
				case "token_is_necessary_for_payment_card_bank_validation":{
					return "El token es necesario para validar la identidad de la tarjeta";
				}break;
				case "phone_is_necessary_for_payment_card_bank_validation":{
					return "El teléfono es necesario para validar la identidad de la tarjeta";
				}break;
				case "no_collect_methods_found_for_this_bank":{
					return "método de adquiriencia no encontrado para este banco";
				}break;
				case "no_collect_methods_allowed_for_this_bank":{
					return "método no permitido para este banco";
				}break;
				case "bank_card_validator_service_is_unavailable":{
					return "servicio de validación bancaria no disponible";
				}break;
				case "credicard_response_unsuccessful":{
					return "respuesta de credicard fallida";
				}break;
				case "credicard_response_unsuccessfull":{
					return "respuesta de credicard fallida";
				}break;
				case "no_bin_found_associatted_with_that_card_number":{
					return "la tarjeta ingresada no esta asociada a ningún banco. Si la tarjeta es internacional, debe estar registrado";
				}break;
				case "no_bin_found_associated_with_that_card_number":{
					return "la tarjeta ingresada no esta asociada a ningún banco";
				}break;
				case "collector_not_found":{
					return "adquiriente no encontrado";
				}break;
				case "approved":{
					return "aprobado";
				}break;
				case "max_character_repetitions":{
					return "no puede haber mas de 3 carácteres iguales repetidos";
				}break;
				case "auth_device_already_authorized":{
					return "dispositivo ya ha sido autorizado";
				}break;
				case "invalid_password":{
					return "contraseña inválida";
				}break;
				case "invalid_id":{
					return "tipo de documento no coincide con tipo de persona seleccionada";
				}break;
				case "there_cannot_be_consecutive_letters":{
					return "no se puede ingresar letras consecutivas";
				}break;
				case "invalid_password_code":{
					return "código inválido";
				}break;
				case "device_is_locked":{
					return "Por medidas de seguridad, luego de alcanzar el máximo de tokens inválidos hemos bloqueado tu usuario CredicardPagos. Podrás volver a ingresar y solicitar un nuevo token luego de cinco (5) minutos.";
				}break;
				case "user_id_login_not_found":{
					return "usuario no encontrado";
				}break;
				case "invalid_user":{
					return "usuario incorrecto";
				}break;
				case "system":{
					return "sistema";
				}break;
				case "error_processing_password":{
					return "error procesando contraseña";
				}break;
				case "user_is_pending_activation":{
					return "usuario ya registrado, esta pendiente por activación";
				}break;
				case "failed_to_upsert":{
					return "fallo al insertar";
				}break;
				case "validation":{
					return "validación";
				}break;
				case "failed:1":{
					return "fallo 1";
				}break;
				case "no requests added":{
					return "no se agregaron solicitudes";
				}break;
				case "user_blocked_by_password":{
					return "Detectamos que has alcanzado el máximo de intentos de ingresos fallidos y por seguridad hemos bloqueado tu usuario credicardpagos. para desbloquearlo puedes hacer click en *recuperar* o puedes llamar a nuestro contact center: 0501-999-9999.";
				}break;
				case "invalid_session":{
					return "sesión inválida";
				}break;
				case "cannot_recover_password":{
					return "no se puede recuperar contraseña";
				}break;
				case "id_doc_already_registered":{
					return "el documento de identidad ya esta registrado";
				}break;
				case "agent":{
					return "caja";
				}break;
				case "bankgateway":{
					return "pasarela de pagos";
				}break;
				case "controlpanel":{
					return "panel de control";
				}break;
				case "issue":{
					return "peticiones, reclamos y sugerencias";
				}break;
				case "profile":{
					return "perfil de usuario";
				}break;
				case "pos":{
					return "Pinpagos";
				}break;
				case "pos-admin":{
					return "Pinpad Admin";
				}break;
				case "servicepay_pos":{
					return "Venta de servicios";
				}break;
				case "servicepay_allied":{
					return "Panel de aliados";
				}break;
				case "servicepay_admin":{
					return "Servicios admin";
				}break;
				case "wallet-bank":{
					return "banco";
				}break;
				case "invalid_activation_code":{
					return "código de activación inválido";
				}break;
				case "role_already_created":{
					return "rol ya creado";
				}break;
				case "password_code_is_expired":{
					return "Código de recuperación expirado, vuelva a solicitar el enlace de recuperación";
				}break;
				case "auth_device_not_found":{
					return "dispositivo no encontrado";
				}break;
				case "authorization_code_expired":{
					return "código de autorización expirado";
				}break;
				case "invalid_answer":{
					return "respuestas inválidas";
				}break;
				case "user_is_already_activated":{
					return "El usuario ya ha sido activado";
				}break;
				case "profile_not_found":{
					return "usuario no encontrado";
				}break;
				case "user_token_not_expired":{
					return "El correo de activación ya ha sido enviado";
				}break;
				case "activation_code_not_found":{
					return "código de activación no encontrado"
				}break;
				case "there_cannot_be_consecutive_numbers":{
					return "no puede utilizar números consecutivos";
				}break;
				case "max_password_tries_user_blocked":{
					return "cantidad de intentos excedido, usuario bloqueado";
				}break;
				case "failed_to_change_password":{
					return "fallo al cambiar la contraseña";
				}break;
				case "password_is_repeated":{
					return "debe introducir una contraseña diferente a las ultimas cinco";
				}break;
				case "unauthorized_session":{
					return "sesión no autorizada";
				}break;
				case "session_closed":{
					return "sesión cerrada";
				}break;
				case "session_expired":{
					return "sesión expirada";
				}break;
				case "session_not_found":{
					return "sesión no encontrada";
				}break;
				case "user_blocked":{
					return "usuario bloqueado";
				}break;
				case "recovery_code_is_expired":{
					return "código de recuperación expirado";
				}break;
				case "email_already_registered":{
					return "usuario ya registrado";
				}break;
				case "user_not_found":{
					return "usuario no encontrado";
				}break;
				case "email_not_registered":{
					return "correo no registrado"	
				}break;
				case "activation_code_is_no_longer_valid":{
					return "el código de activación no es valido";
				}break;
				case "failed_to_update":{
					return "fallo al actualizar";
				}break;
				case "user_already_exist":{
					return "dirección de correo ya registrado";
				}break;
				case "default_email_can_not_be_removed":{
					return "correo predeterminado no puede ser borrado";
				}break;
				case "email_not_found":{
					return "correo electrónico no éxiste";
				}break;
				case "phone_already_added":{
					return "teléfono ya existe";
				}break;
				case "password_do_not_match":{
					return "contraseña incorrecta";
				}break;
				case "unauthorized_client":{
					return 'cliente no autorizado';
				}break;
				case 'session_code_expired':{
					return 'código de sesión expirado';
				}break;
				case 'session_code_invalid':{
					return 'código de sesión inválido';
				}break;
				case 'closed':{
					return 'cerrado';
				}break;
				case 'expired':{
					return 'expirado';
				}break;
				case 'active':{
					return 'activo';
				}break;
				case 'device_pending_auth':{
					return 'dispositivo pendiente por autorización';
				}break;
				case 'invalid_user_or_password':{
					return 'Has ingresado uno o más datos inválidos, recuerda que por tu seguridad, luego de tres (3) intentos fallidos bloquearemos tu usuario de forma preventiva';
				}break;
				case 'user_not_activated':{
					return "usuario no activo";
				}break;
				case 'legal_person':{
					return 'persona legal';
				}break;
				case 'natural_person':{
					return 'persona natural';
				}break;
				case 'id_doc_registered':{
					return 'Documento de identidad ya registrado';
				}break;
				case 'device not found':{
					return 'dispositivo no encontrado';
				}break;
				case 'device locked':{
					return 'dispositivo desbloqueado';
				}break;
				case 'payment_card_already_added':{
					return 'tarjeta de crédito ya adicionada';
				}break;
				case 'all_users':{
					return 'todos los usuarios';
				}break;
				case 'task':{
					return 'tarea';
				}break;
				case 'realm can not be null':{
					return 'el dominio no puede estar vacío';
				}break;
				case 'id doc already exist':{
					return 'el número de documento ya existe';
				}break;
				case 'undelivered':{
					return 'no entregado';
				}break;
				case 'not_received':{
					return 'no recibido';
				}break;
				case 'received':{
					return 'recibido';
				}break;
				case 'delivered':{
					return 'entregado';
				}break;
				case 'created':{
					return 'creado';
				}break;
				case 'dispatched':{
					return 'despachado';
				}break;
				case 'cancelled':{
					return 'anulado';
				}break;
				case 'canceled':{
					return 'anulado';
				}break;
				case 'paid':{
					return 'pagado';
				}break;
				case 'not_payed':{
					return 'no pagado';
				}break;
				case 'reversed':{
					return 'reversado';
				}break;
				case 'unavailable':{
					return 'no disponible';
				}break;
				case 'available':{
					return 'disponible';
				}break;
				case 'inactive':{
					return 'INACTIVO';
				}break;
				case 'locked':{
					return 'BLOQUEADO';
				}break;
				case 'no results':{
					return 'no hay resultados';
				}break;
				case 'deleted successfully':{
					return 'eliminado con exito';
				}break;
				case 'efe':{
					return 'efectivo'
				}break;
				case 'payment method not found':{
					return 'método de pago no encontrado';
				}break;
				case 'sales cycle open not found':{
					return 'ciclo de ventas no ha sido abierto';
				}break;
				case 'user cannot be updated':{
					return 'usuario no actualizado';
				}break;
				case 'invalid password':{
					return 'contraseña inválida';
				}break;
				case 'transaction not found':{
					return 'Id de transacción no encontrada';
				}break;
				case 'operator not found':{
					return 'Operador no registrado';
				}break;
				case 'unprocessable Entity':{
					return 'entidad no procesable';
				}break;
				case 'user updated':{
					return 'Usuario modificado';
				}break;
				case 'password changed':{
					return 'contraseña modificada';
				}break;
				case 'user cannot be registered':{
					return 'usuario no puede ser registrado';
				}break;
				case 'user already exist':{
					return 'dirección de correo ya registrado';
				}break;
				case 'email login already registered':{
					return 'correo electrónico ya registrado';
				}break;
				case 'access_denied':{
					return 'acceso negado';
				}break;
				case 'the user or authorization server denied the request.':{
					return 'usuario y/o contraseña incorrectos';
				}break;
				case 'request password change error':{
					return 'error al intentar cambiar la contraseña';
				}break;
				case 'invalid_request':{
					return 'solicitud inválida';
				}break;
				case 'the request is missing a parameter, contains an invalid parameter, includes a parameter more than once.':{
					return 'A la solicitud le falta un parámetro, contiene un parámetro no válido e incluye un parámetro más de una vez.';
				}break;
				case 'user not found':{
					return 'usuario no encontrado';
				}break;
				case 'request password change error':{
					return 'error al solicitar cambio de contraseña';
				}break;
				case 'invalid answer':{
					return 'respuestas inválidas';
				}break;
				case 'invalid user':{
					return 'usuario inválido';
				}break;
				case 'user cannot be activated':{
					return 'usuario no puede ser activado';
				}break;
				case 'not_implemented':{
					return 'servicio no implementado';
				}break;
				case 'id_doc_already_in_use':{
					return 'número de documento, ya esta registrado';
				}break;
				case 'user_profile_not_found':{
					return 'Perfil de usuario no encontrado';
				}break;
				case 'home':{
					return 'hogar';
				}break;
				case 'work':{
					return 'trabajo';
				}break;
				case 'business':{
					return 'panel de control';
				}break;
				case 'checking':{
					return 'corriente';
				}break;
				case 'savings':{
					return 'ahorros';
				}break;
				case 'saving':{
					return 'ahorros';
				}break;
				case 'wallet':{
					return 'billetera';
				}break;
				case 'invalid_recovery_password_emails':{
					return 'Correo de recuperación inválido';
				}break;
				case 'device_is_locked_for_too_many_login_tries':{
					return 'El dispositivo esta bloqueado, por varios intentos fallidos de incio de sesion';
				}break;
				case 'agent':{
					return 'agente';
				}break;
				case 'invalid_credit_card_number':{
					return 'Tarjeta inválida';
				}break;
				case 'user_is_not_pending_password_and_security_questions':{
					return 'Usuario no pendiente de contraseña y preguntas de seguridad';
				}break;
				case 'user_is_locked_by_inactivity':{
					return 'Usuario bloqueado por inactividad';
				}break;
				case 'device_is_locked_for_too_many_login_tries':{
					return 'El dispositivo está bloqueado por demasiados intentos de inicio de sesión';
				}break;
				default:{
					return texto;
				}
			}
		}break;
		default:{
			return texto;
		}
	}
}