import EventBus from 'eventbusjs';

const sendEvent = (event, data) => EventBus.dispatch(event, this, data);
export default sendEvent;
