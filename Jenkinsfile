pipeline {

  environment {
    dockerimagename = "nodeapp"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
                     git branch: 'main', credentialsId: 'efd41fd7-d0a9-4d70-8a82-d860de12d5c6', url: 'https://github.com/safaafabt/Pointage.git',

      
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