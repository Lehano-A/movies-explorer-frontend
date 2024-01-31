import React, { useEffect } from "react";


function NotificationPopup({
  notificationPopup,
  setNotificationPopup
}) {


  // ОБРАБОТАТЬ КЛИК ПО УВЕДОМЛЕНИЮ
  function handleClickOnNotification() {
    setNotificationPopup({ isActive: null, type: null, message: null })
  }


  useEffect(() => {
    const idTimeout = setTimeout(() => { handleClickOnNotification() }, 5000)

    return () => clearTimeout(idTimeout)
  }, [])



  return (
    <div
      onClick={handleClickOnNotification}
      className={`
      notification-popup
      ${notificationPopup.isActive ? 'notification-popup_active' : ''}
      ${notificationPopup.type === 'success' ? 'notification-popup_type_success' : 'notification-popup_type_error'}
      `}
    >

      <p className={'notification-popup__message'}>{notificationPopup.message}</p>

    </div>
  )
}

export default NotificationPopup;
