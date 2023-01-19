import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { StorageAccessFramework } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { printToFileAsync } from "expo-print";

export default function App() {
  const [document, setDocument] = useState(null);

  async function openShareDialogAsync() {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    Sharing.shareAsync(document);
  }

  async function handleDownload() {
    let url =
      "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf";

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + "a.pdf",
      {},
      () => {}
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      setDocument(uri);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    handleDownload();
  }, []);

  const downloadPdf = async () => {
    const html = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
        .statement-period-container {
          display: flex;
          justify-content: space-between;
          color: red;
          padding: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .customer-info-column{
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;
          font-weight: bold;
          font-size: 0.9rem;
        }
        .account-details-title {
          font-weight: 600;
          color: #34495E;
          font-size: 20px;
        }
        .account-details-container{
          padding: 1rem;
          border: 1px solid red;
          border-radius: 5px;
          margin-bottom: 1rem;
        }
        .main {
          display: flex;
          width: 100vw;
          justify-content: center;
        }
        </style>
      </head>
      <body>
        <div>
          <div>
            <h2 style="color:#34495E; text-align: center;">Account Summary</h2>
            <img src="https://logos-world.net/wp-content/uploads/2020/10/Free-Logo.png" heigtt=100 width=100 />
            <hr />
            <div class="statement-period-container">
              <div>
                Period: 20/07/2018 to 18/01/2023
                
              </div>
              <div>
                Statement Date: 18/01/2023
              </div>
            </div>
            <div class="account-details-container">
              <div class="account-details-title">
                Account Details
              </div>
              <div class="customer-info">
                <div class="customer-info-column">
                  <div>Customer Name:</div>
                  <div> Test Dev</div>
                  <div>Customer Name:</div>
                  <div> Test Dev</div>
                </div>
                <div class="customer-info-column">
                  <div>Customer Name:</div>
                  <div> Test Dev</div>
                  <div>Customer Name:</div>
                  <div> Test Dev</div>
                </div>
                <div class="customer-info-column">
                  <div>Customer Name</div>
                  <div> Test Dev</div>
                  <div>Customer Name</div>
                  <div> Test Dev</div>
                </div>
              </div>
            </div>
            <hr />
            <table id="table">
              <tr style="background-color: azure; padding: 1rem">
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Transaction ID</th>
                <th>Current Amount</th>
                <th>Current Balance</th>
              </thead>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
            </table>git 
          </div>
        </div>
      </body>
      </html>
    `;
    const file = await printToFileAsync({
      html: html,
      base64: false,
      margins: {
        left: 20,
        top: 50,
        right: 20,
        bottom: 100,
      },
    });
    await Sharing.shareAsync(file.uri);
  };

  const downloadDynamic = async () => {
    const options = {
      title: "Account Summary",
      companyLogo:
        "https://logos-world.net/wp-content/uploads/2020/10/Free-Logo.png",
      period: {
        fromDate: "20/07/2018",
        toDate: "18/01/2023",
      },
      generatedOn: "18/01/2023",
      customerInfo: [
        {
          key: "Customer Name",
          value: "Test Dev",
        },
        {
          key: "Account Type",
          value: "PostPaid",
        },
        {
          key: "Account ID",
          value: "2364508334",
        },
        {
          key: "Contact Number",
          value: "+91 (630) 444-0879",
        },
        {
          key: "Customer Category",
          value: "Individual",
        },
      ],
    };
    const generatCustomerInfo = () => {
      const { customerInfo } = options;
      const rows = customerInfo.map(
        (info) =>
          `<div class="child"><div>${info.key}:</div><div>${info.value}</div></div>`
      );
      return rows.join("");
    };
    const html = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Summary</title>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          tr:nth-child(even) {
            background-color: #dddddd;
          }
          .statement-period-container {
            display: flex;
            justify-content: space-between;
            color: red;
            padding: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
          }
          .customer-info-column{
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            font-weight: bold;
            font-size: 0.9rem;
          }
          .account-details-title {
            font-weight: 600;
            color: #34495E;
            font-size: 20px;
          }
          .account-details-container{
            padding: 1rem;
            border: 1px solid red;
            border-radius: 5px;
            margin-bottom: 1rem;
          }
          .main {
            display: flex;
            width: 100vw;
            justify-content: center;
          }
          .parent{
            display: flex;
            flex-wrap: wrap;
          }
        
          .child{
            flex: 33%;
            box-sizing: border-box;
            margin: 1rem 0;
          }
          </style>
      </head>
      <body>
        <div>
          <div>
            <h2 style="color:#34495E; text-align: center;">${options.title}</h2>
            <img src="${options.companyLogo}" heigtt=100 width=100 />
            <hr />
            <div class="statement-period-container">
              <div>
                Period: ${options.period.fromDate} to ${options.period.toDate}
                
              </div>
              <div>
                Statement Date: ${options.generatedOn}
              </div>
            </div>
            <div class="account-details-container">
              <div class="account-details-title">
                Account Details
              </div>
              <div class="parent">
                  ${generatCustomerInfo()}
              </div>
            </div>
            <hr />
            <table id="table">
              <tr style="background-color: azure; padding: 1rem">
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Transaction ID</th>
                <th>Current Amount</th>
                <th>Current Balance</th>
              </thead>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
              <tr>
                <td>
                  17-12-2021
                </td>
                <td> Bill</td>
                <td>236532467034</td>
                <td>$135.84</td>
                <td>$241.43</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;
    const file = await printToFileAsync({
      html: html,
      base64: false,
      margins: {
        left: 20,
        top: 50,
        right: 20,
        bottom: 100,
      },
    });
    await Sharing.shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Welcome Saroj!</Text>
      {/* <Button title="DownLoad" onPress={anotherDownloader} /> */}
      <Button title="Download" onPress={openShareDialogAsync} />
      {/* <Button title="Download Pdf" onPress={downloadPdf} />
      <Button title="Download Dynamic Pdf" onPress={downloadDynamic} />
      <Button title="download andriod" onPress={downloadFileTemp} /> */}
      {/* <Dashboard /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
