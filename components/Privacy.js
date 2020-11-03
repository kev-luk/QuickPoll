import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Layout } from "@ui-kitten/components";

const Privacy = () => {
  return (
    <Layout style={{ flex: 1 }} level="1">
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.privacyHeader}>PRIVACY POLICY</Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            Privacy Policy CometShare built the QuickPoll app as a Commercial
            app. This SERVICE is provided by CometShare and is intended for use
            as is. This page is used to inform visitors regarding our policies
            with the collection, use, and disclosure of Personal Information if
            anyone decided to use our Service. If you choose to use our Service,
            then you agree to the collection and use of information in relation
            to this policy. The Personal Information that we collect is used for
            providing and improving the Service. We will not use or share your
            information with anyone except as described in this Privacy Policy.
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at QuickPoll unless
            otherwise defined in this Privacy Policy.
          </Text>
          <Text style={styles.sub}>Information Collection and Use </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to Name, Emails, Proof of Purchases,
            Usernames, Passwords, Date of Birth. The information that we request
            will be retained by us and used as described in this privacy policy.
            The app does use third party services that may collect information
            used to identify you. Links to Privacy of third party service
            providers used by the app are
            https://policies.google.com/policies/privacy for Google Play
            Services and https://expo.io/privacy for Expo.
          </Text>
          <Text style={styles.sub}>Log Data</Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            We want to inform you that whenever you use our Service, in a case
            of an error in the app we collect data and information (through
            third party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing our Service, the time and date of your use of
            the Service, and other statistics.
          </Text>
          <Text style={styles.sub}>Cookies </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal
            memory. This Service does not use these “cookies” explicitly.
            However, the app may use third party code and libraries that use
            “cookies” to collect information and improve their services. You
            have the option to either accept or refuse these cookies and know
            when a cookie is being sent to your device. If you choose to refuse
            our cookies, you may not be able to use some portions of this
            Service.
          </Text>
          <Text style={styles.sub}> Service Providers </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            We may employ third-party companies and individuals due to the
            following reasons: To facilitate our Service; To provide the Service
            on our behalf; To perform Service-related services; or To assist us
            in analyzing how our Service is used. We want to inform users of
            this Service that these third parties have access to your Personal
            Information. The reason is to perform the tasks assigned to them on
            our behalf. However, they are obligated not to disclose or use the
            information for any other purpose.
          </Text>
          <Text style={styles.sub}>Security</Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </Text>
          <Text style={styles.sub}> Links to Other Sites </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Text>
          <Text style={styles.sub}>Children’s Privacy </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13. In the case we discover that a child under 13 has provided
            us with personal information, we immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us
            so that we will be able to do necessary actions.
          </Text>
          <Text style={styles.sub}>Changes to This Privacy Policy </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page. This policy is effective as of 2020-07-29
          </Text>
          <Text style={styles.sub}> Contact Us </Text>
          <Text style={{ marginHorizontal: 15 }} category="p1">
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at support@cometshare.com.
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  privacyHeader: {
    //color: "black",
    fontWeight: "bold",
    fontSize: 28,
  },
  sub: {
    //color: "black",
    fontWeight: "700",
    fontSize: 18,
  },
});
