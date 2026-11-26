# Variables de rutas de proyectos
BACKEND_DIR = /app/backend
STARTUP_PROJ = src/Plantarium.Api/Plantarium.Api.csproj
SEEDS_PROJ = src/Modules/Seeds/Plantarium.Modules.Seeds.csproj
FRUITS_PROJ = src/Modules/Fruits/Plantarium.Modules.Fruits.csproj
PLANTS_PROJ = src/Modules/Plants/Plantarium.Modules.Plants.csproj
COMPOSE_DEV = docker compose -f compose.dev.yaml
COMPOSE_PROD = docker compose -f compose.prod.yaml

.PHONY: help up-dev up-dev-back down-dev reset-dev logs-dev db-update-dev migrate-seeds-dev migrate-fruits-dev migrate-plants-dev

help: ## Muestra esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

# --- Docker ---
# development
up-dev: ## Levanta todo el entorno en segundo plano
	$(COMPOSE_DEV) up -d

up-local: ## Levanta solo el backend y la base de datos en modo local (sin contenedores)
	cd backend/src/Plantarium.Api && \
	ASPNETCORE_ENVIRONMENT=Development \
	ASPNETCORE_URLS=http://localhost:8080 \
	DOTNET_USE_POLLING_FILE_WATCHER=true \
	DOTNET_WATCH_RESTART_ON_RUDE_EDIT=true \
	dotnet watch run --no-launch-profile

up-dev-back: ## Levanta solo el backend y la base de datos
	$(COMPOSE_DEV) up -d backend

up-dev-front: ## Levanta solo el frontend y la base de datos
	$(COMPOSE_DEV) up -d frontend

up-dev-db: ## Levanta solo la base de datos
	$(COMPOSE_DEV) up -d postgres

down-dev: ## Detiene los contenedores conservando los datos
	$(COMPOSE_DEV) down

build-dev: ## Reconstruye las imágenes de los contenedores
	$(COMPOSE_DEV) build

reset-dev: ## Borra contenedores y volúmenes (reinicio limpio desde cero)
	$(COMPOSE_DEV) down -v

logs-dev: ## Muestra los logs del backend en tiempo real
	$(COMPOSE_DEV) logs -f backend

# --- Migraciones EF Core ---
db-update-dev: ## Aplica las migraciones de todos los módulos (Seeds, Fruits, Plants)
	$(COMPOSE_DEV) exec -w $(BACKEND_DIR) backend sh -c "\
		dotnet ef database update --project $(SEEDS_PROJ) --startup-project $(STARTUP_PROJ) --context SeedDbContext && \
		dotnet ef database update --project $(FRUITS_PROJ) --startup-project $(STARTUP_PROJ) --context FruitDbContext && \
		dotnet ef database update --project $(PLANTS_PROJ) --startup-project $(STARTUP_PROJ) --context PlantDbContext"

db-update-local:
	cd backend && \
	dotnet ef database update --project $(SEEDS_PROJ) --startup-project $(STARTUP_PROJ) --context SeedDbContext && \
	dotnet ef database update --project $(FRUITS_PROJ) --startup-project $(STARTUP_PROJ) --context FruitDbContext && \
	dotnet ef database update --project $(PLANTS_PROJ) --startup-project $(STARTUP_PROJ) --context Plant

migrate-seeds-dev: ## Crea una nueva migración en Seeds (Uso: make migrate-seeds name=Nombre)
	$(COMPOSE_DEV) exec -w $(BACKEND_DIR) backend dotnet ef migrations add $(name) --project $(SEEDS_PROJ) --startup-project $(STARTUP_PROJ) --context SeedDbContext

migrate-fruits-dev: ## Crea una nueva migración en Fruits (Uso: make migrate-fruits name=Nombre)
	$(COMPOSE_DEV) exec -w $(BACKEND_DIR) backend dotnet ef migrations add $(name) --project $(FRUITS_PROJ) --startup-project $(STARTUP_PROJ) --context FruitDbContext

migrate-plants-dev: ## Crea una nueva migración en Plants (Uso: make migrate-plants name=Nombre)
	$(COMPOSE_DEV) exec -w $(BACKEND_DIR) backend dotnet ef migrations add $(name) --project $(PLANTS_PROJ) --startup-project $(STARTUP_PROJ) --context PlantDbContext

# --- Docker Compose Production ---
up-prod: ## Levanta todo el entorno en segundo plano (producción)
	$(COMPOSE_PROD) up -d

up-prod-back: ## Levanta solo el backend y la base de datos (producción)
	$(COMPOSE_PROD) up -d backend

up-prod-front: ## Levanta solo el frontend y la base de datos (producción)
	$(COMPOSE_PROD) up -d frontend

down-prod: ## Detiene los contenedores conservando los datos (producción)
	$(COMPOSE_PROD) down

build-prod: ## Reconstruye las imágenes de los contenedores (producción)
	$(COMPOSE_PROD) build

reset-prod: ## Borra contenedores y volúmenes (reinicio limpio desde cero) (producción)
	$(COMPOSE_PROD) down -v

db-update-prod: ## Ejecuta los bundles de migración en el contenedor de producción
	docker compose -f compose.prod.yaml exec backend sh -c "\
		./migrations/migrate-seeds --connection \"\$$ConnectionStrings__PlantariumDatabase\" && \
		./migrations/migrate-fruits --connection \"\$$ConnectionStrings__PlantariumDatabase\" && \
		./migrations/migrate-plants --connection \"\$$ConnectionStrings__PlantariumDatabase\""