Create Database sistema_votacion;

USE sistema_votacion;

CREATE TABLE `regiones` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  PRIMARY KEY (`Id`)
)ENGINE=InnoDB; 

CREATE TABLE `comunas` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  `regionId` int NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`regionId`) REFERENCES `regiones`(`Id`)
)ENGINE=InnoDB; 

CREATE TABLE `candidato` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  `ComunaId` int NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`ComunaId`) REFERENCES `comunas`(`Id`)
) ENGINE=InnoDB;

CREATE TABLE `votacion` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  `Alias` varchar(200) ,
  `Rut` varchar(20) NOT NULL,
  `Email` varchar(50) ,
  `RegionId` int NOT NULL,
  `ComunaId` int NOT NULL,
  `CandidatoId` int NOT NULL,
  `Tie_web` int ,
  `Tie_tv` int ,
  `Tie_red` int ,
  `Tie_amigo` int ,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`regionId`) REFERENCES `regiones`(`Id`),
  FOREIGN KEY (`ComunaId`) REFERENCES `comunas`(`Id`),
  FOREIGN KEY (`CandidatoId`) REFERENCES `candidato`(`Id`)
) ENGINE=InnoDB;

INSERT INTO `regiones` VALUES (1,'Region 1'),(2,'Region 2'),(3,'Region 3');
INSERT INTO `comunas` VALUES (1,'Comuna 1',1),(2,'Comuna 2',2),(3,'Comuna 3',3),(4,'Comuna 4',2);
INSERT INTO `candidato` VALUES (8,'Candidato 8',4),(7,'Candidato 7',4),(1,'Candidato 1',1),(2,'Candidato 2',1),(3,'Candidato 3',2),(4,'Candidato 3',2),(5,'Candidato 5',3),(6,'Candidato 6',3);

ALTER TABLE sistema_votacion.votacion ADD INDEX(rut);


INSERT INTO `regiones` VALUES (1,'Region 1'),(2,'Region 2'),(3,'Region 3');
INSERT INTO `comunas` VALUES (1,'Comuna 1',1),(2,'Comuna 2',2),(3,'Comuna 3',3),(4,'Comuna 4',2);
INSERT INTO `candidato` VALUES (8,'Candidato 8',4),(7,'Candidato 7',4),(1,'Candidato 1',1),(2,'Candidato 2',1),(3,'Candidato 3',2),(4,'Candidato 3',2),(5,'Candidato 5',3),(6,'Candidato 6',3);
INSERT INTO `votacion` VALUES (null,'prueba1','prueba','','eduardo.patricio@gmail.com',1,1,1,1,1,0,0);


