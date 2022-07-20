import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export default useContacts = () => {
    const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
          });
  
          if (data.length > 0) {
            setContacts(
              data
                .filter(
                  (contact) =>
                    contact?.phoneNumbers?.length > 0 && contact?.firstName
                )
                .map(mapContactToUser)
            );
          }
        }
      })();
    }, []);
  
    return contacts;
  };
  
  const mapContactToUser = (contact) => {
    return {
      contactName:
        contact.firstName && contact.lastName
          ? `${contact.firstName} ${contact.lastName}`
          : contact.firstName,
      phoneNumber: contact.phoneNumbers[0].number,
      id: contact.id,
    };
  };