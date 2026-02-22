
actualiza este markdwon D:\UIDE\06 LTI_05A_INS-IS-ASC\semanas\semana-01\presentacion-semana1.md para que añadas la referencias bibligorafiacas t puedas       
  sustentar donde se debe, revisa aqui que este es para esta semana Referencias:

ok, ahora en base a este archivo D:\UIDE\02 LTI_05A_458 PMSBD-MC,C\semanas\semana-01\generate-semana1-docx.js, genera para esta información D:\UIDE\06 LTI_05A_INS-IS-ASC\semanas\semana-01\presentacion-semana1.md y ponlo en la carpeta del mismo proyecto de md y ejecutalo

# Plantilla de Prompts

## Nombres de Proyectos (Guía de Referencia)

### Proyectos Activos
- **Proyecto 01**: `01 FT-06-SIM Simulación-MC`
- **Proyecto 02**: `02 LTI_05A_458 PMSBD-MC`
- **Proyecto 03**: `03 PP-07-HCI-ASC`
- **Proyecto 04**: `04 GA-GEA-F-10 ED-MC`
- **Proyecto 05**: `05 LTI_05A_300-SGBD-ASC`
- **Proyecto 06**: `06 LTI_05A_INS-IS-ASC`
- **Proyecto 07**: `07 PP-08-AIPTI`

### Formato de Reemplazo
Cuando uses los prompts, reemplaza:
- `[NÚMERO DE PROYECTO]` → El número de proyecto (01, 02, 03, etc.)
- `[NÚMERO DE SEMANA]` → El número de semana (01, 02, 03, etc.)
- Usa el nombre completo de la carpeta tal como aparece arriba

---

## Índice de Prompts

- [Prompt 01 - Compendio Académico con Referencias APA](#prompt-01---compendio-académico-con-referencias-apa)
- [Prompt 02 - Generación de Presentación desde Plantilla](#prompt-02---generación-de-presentación-desde-plantilla)
- [Prompt 03 - Migración de Presentación a Nueva Plantilla](#prompt-03---migración-de-presentación-a-nueva-plantilla)
- [Prompt 04 - Actualización de Canvas HTML](#prompt-04---actualización-de-canvas-html)
- [Prompt 05 - Generación de Práctica Evaluada](#prompt-05---generación-de-práctica-evaluada)
- [Prompt 06 - Validación de Contenidos de Presentación](#prompt-06---validación-de-contenidos-de-presentación)
- [Prompt 07 - Mejora de Estilo Académico](#prompt-07---mejora-de-estilo-académico)
- [Prompt 08 - Organización con Slides Verticales](#prompt-08---organización-con-slides-verticales)
- [Prompt 09 - Notificación de Ausencia](#prompt-09---notificación-de-ausencia)

---

## Prompt 01 - Compendio Académico con Referencias APA

```
Por favor, ayúdame a elaborar un compendio exhaustivo sobre el siguiente tema (sin añadir temas adicionales):

Tema: [INGRESA AQUÍ EL TEMA]

Requisitos del compendio:
- Incluir citas textuales y referencias en formato APA 7
- Utilizar diversos tipos de citas: cortas, largas, narrativas, etc.
- Añadir ejemplos reales y visuales
- Incluir código fuente cuando sea pertinente
- IMPORTANTE: No olvidar incluir las referencias bibliográficas completas al final
- Asegurate que bibligorafia debe incluir exactamente en que pagina/capitulo/sección del libro dice o se extrae la información. es para poder sustentar la veracidad de la información

IMPORTANTE: Tomar en cuenta que no se repita la información de las semanas anteriores.
```

---

## Prompt 02 - Generación de Presentación desde Plantilla

```
Por favor, genera un archivo Markdown para presentación tomando como base el formato de D:\UIDE\01 FT-06-SIM Simulación-MC\semanas\semana-07\presentacion-semana7.md para la presentación de la semana [NÚMERO DE SEMANA] del proyecto [NÚMERO DE PROYECTO].

Especificaciones:
- Extraer la información del archivo presentacion-semana[NÚMERO].md
- Utilizar un caso de uso como hilo conductor para la presentación
- Guardar el archivo en la carpeta que corresponda al proyecto
```

---

## Prompt 03 - Migración de Presentación a Nueva Plantilla

```
Quiero que trabajes dentro de la siguiente estructura de proyecto:

Existe una plantilla base en templates/template-presentacion.html.

Existe un archivo README.md en la raíz del proyecto con la información general (asignatura, docente, periodo, unidad, semana, etc.).

Tarea:

Copia el contenido de templates/template-presentacion.html y úsalo como base para crear la presentación de la Semana [NÚMERO DE SEMANA] del proyecto [NÚMERO DE PROYECTO].

A partir del contenido del README.md, completa la carátula de la presentación.

Desarrolla todo el contenido de la presentación de la Semana [NÚMERO DE SEMANA] dentro de la plantilla, respetando su estructura de secciones y clases CSS.

Lineamientos de estilo (muy importantes):

No utilices emojis; usa únicamente iconos de Font Awesome (por ejemplo: <i class="fas fa-info-circle"></i>).

Para ejemplos de código, emplea Prism.js usando la estructura:

<pre><code class="language-javascript">
// ejemplo
</code></pre>


Ajusta el lenguaje según corresponda.

Si necesitas incluir diagramas, deben ser generados en Excalidraw, entregados en formato JSON listo para importar.

CRÍTICO (Calidad Excalidraw):
- El diseño debe ser profesional y limpios.
- **Textos legibles**: Tamaño adecuado.
- **Colores profesionales**: Usa una paleta sobria y profesional (acorde a UIDE).
- **Conectividad**: Elementos bien linkeados y flow lógico claro.

Usa la estructura:
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [
     ...
  ]
}

El JSON debe estar completo y funcional para importación directa en Excalidraw.

IMPORTANTE SOBRE CÓDIGO GENERADO:
Si generas archivos CSS o JS adicionales o especializados, estos DEBEN ubicarse obligatoriamente dentro de las carpetas `css/` y `js/` respectivamente. Nunca los generes en la raíz del proyecto.

CRÍTICO - SOPORTE DE TEMA CLARO/OSCURO:
El template incluye un sistema de cambio de tema (light/dark mode) con toggle en la esquina superior derecha. TODO el contenido que generes DEBE ser compatible con ambos temas:

- **Modo por defecto**: CLARO (light mode)
- **Fondos de slides**: Usa `bg-white/95 dark:bg-[rgba(15,20,25,0.95)]`
- **Bordes**: Usa `border-slate-200 dark:border-white/15`
- **Textos principales**: Usa `text-slate-900 dark:text-white`
- **Textos secundarios**: Usa `text-slate-700 dark:text-gray-300` o `text-slate-600 dark:text-gray-400`
- **Cards/Contenedores**: Usa `bg-white dark:bg-[rgba(15,20,25,0.8)]` con bordes `border-slate-300 dark:border-white/20`
- **NO uses `text-shadow`** - causa problemas de legibilidad en modo claro
- **NO uses colores hardcoded** sin su variante `dark:`
- **Color UIDE (accent)**: `text-uide-accent` funciona en ambos modos
- Asegúrate de que TODOS los elementos tengan buen contraste en AMBOS modos

Lineamientos pedagógicos (evitar saturación y redundancia):

Usa la regla 3×3:

Máximo 1 idea principal por slide.

Máximo 3 bullets por slide.

Bullets breves, claros, sin párrafos extensos.

Evita la densidad cognitiva: si un concepto es grande, divídelo en varias diapositivas.

Evita la redundancia conceptual: define un concepto una sola vez.

Prefiere ejemplos concretos antes que largas explicaciones teóricas.

Estructura sugerida de la presentación:

Carátula con datos del README.md.

Resultados de aprendizaje de la semana

3–4 bullets, enunciados en términos de capacidades logradas por el estudiante.

Contexto / motivación

1–2 slides que expliquen relevancia y aplicación del tema.

Marco conceptual

Varias diapositivas, cada una con un concepto clave y máximo 3 bullets.

Si un concepto requiere esquemas, incluye un diagrama en Excalidraw (JSON).

Ejemplos prácticos

Ejemplos simples; si hay código, usar Prism.js.

Actividad / Preguntas de reflexión

2–3 preguntas que inviten a pensar o aplicar.

Resumen final

3 ideas clave que el estudiante debe retener.

Entregable:

Devuélveme el archivo HTML completo de la presentación de la Semana [NÚMERO DE SEMANA], ya adaptado desde template-presentacion.html, incluyendo:

Carátula completa con datos del README.

Slides siguiendo la regla 3×3.

Uso exclusivo de Font Awesome.

Código resaltado con Prism.js.

Diagramas incluidos como JSON de Excalidraw cuando se requiera.

Ningún emoji y sin redundancia conceptual.
```

---

## Prompt 04 - Generación de Canvas HTML

```
Por favor, genera el archivo canvas-semana[NÚMERO].html del proyecto [NÚMERO DE PROYECTO] basándote en la plantilla D:\UIDE\templates\template-pag-canva.html y en:
- La presentación de la semana [NÚMERO DE SEMANA]
- Las actividades calificadas de la semana [NÚMERO DE SEMANA] (ubicadas en README.md)
```

---

## Prompt 05 - Generación de Práctica Evaluada

```
Por favor, genera la Práctica Evaluada para la semana [NÚMERO DE SEMANA] del proyecto [NÚMERO DE PROYECTO] basándote en la plantilla D:\UIDE\templates\PE-template.html.

Especificaciones:
- Código de la práctica: [CÓDIGO Y DESCRIPCIÓN DE LA PRÁCTICA]
- Peso de la evaluación: [PUNTAJE]
- Basar la práctica en el contenido del archivo de presentación HTML de la semana [NÚMERO DE SEMANA]
- Asegurar que la práctica no sea excesivamente compleja
- Mantener un nivel de dificultad apropiado para los estudiantes
- Incluir instrucciones claras y tabla de actividades similar a la plantilla
- Especificar modalidad, duración y forma de entrega

Adicionalmente:
- Generar la rúbrica de evaluación en formato CSV basándote en D:\UIDE\templates\import_rubric_template.csv
- La rúbrica debe alinearse con las actividades y criterios de evaluación de la práctica
- Definir criterios claros y niveles de desempeño con sus respectivos puntajes
- Guardar el archivo CSV con el nombre apropiado para la práctica evaluada
```

---

