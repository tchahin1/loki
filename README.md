**1. PREREQUISITES**
- Google Chrome
- Git
- IntelliJ IDEA (optional)
- Android Studio and AVD Manager (for the emulator)
- Download and install Node.js and npm (https://nodejs.org/en/download/);
- Install Expo CLI utility globally ('npm install -g expo-cli');
- Download and unzip Wildfly Application Server (https://wildfly.org/downloads/)
- Download and install Java Development Kit (https://www.oracle.com/technetwork/java/javase/downloads/index.html)

**2. PROJECT SETUP**
- Clone the loki project

**3. MOBILE SETUP**
- Navigate to \mobile\MojaEPBiH and run 'npm install'
- Start the Android emulator
- Run 'npm start' in the same directory
- Select 'Run on Android device/emulator' in the Expo interface

**4. SERVER SETUP**
- Set the downloaded JDK as the project SDK
- Run Maven 'clean' and 'install' goals in IntelliJ
- Add this to `<properties>` in pom.xml if an error regarding the usage of the newest jdk occurs :

    `<maven.compiler.source>1.8</maven.compiler.source>`
    `<maven.compiler.target>1.8</maven.compiler.target>`
- Create a new local JBoss Server IntelliJ Configuration and configure it with the downloaded wildfly ... deploy the mojaepbih.war from target and set Maven goal 'clean install' to run before the deploy
- Go to 'PATH_TO_WILDFLY\standalone\configuration\standalone.xml' and change 127.0.0.1 to 0.0.0.0 to expose wildfly on all network adapters
- Run the deploy configuration


