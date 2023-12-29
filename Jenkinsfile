pipeline {

  environment {
    dockerimagename = "nodeapp"
    dockerImage = ""
  }

  agent any

      
    tools {
        git 'Git'
    }

  stages {

    stage('Checkout Source') {
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