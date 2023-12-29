pipeline {

  environment {
    dockerimagename = "bravinwasike/node-app"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      git branch: 'main', credentialsId: '82aa2d26-ef4b-4a6a-a05f-2e1090b9ce17', url: 'git@github.com:jenkinsci/maven-plugin.git'
   }
      steps {
        git 'https://github.com/safaafabt/Pointage.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhub-credentials'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying Node.js container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deployment.yaml", "service.yaml")
        }
      }
    }

  }

}